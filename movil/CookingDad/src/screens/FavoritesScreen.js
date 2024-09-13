import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {db} from "../utils";
import { Loading } from "../components/shared"
import { UserNotLogged, NotRecipes, FavoritesList } from "../components/favorites";
import { size, map } from "lodash";

export function FavoriteScreen() {
  const [userLogged, setUserLogged] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (auth?.currentUser) {
      const q = query(
        collection(db, "favoritos"),
        where("idUser", "==", auth.currentUser.uid)
      );
      onSnapshot(q, async (snapshot) => {
        let recipesArray = [];
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "recetas", data.idRecipe);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;
          recipesArray.push(newData);
        }
        setRecipes(recipesArray);
      });
    }
  }, [auth]);

  if (!userLogged) return <UserNotLogged />;

  if (!recipes) return <Loading show text="Cargando" />;

  if (size(recipes) == 0) return <NotRecipes />;

  return (
    <ScrollView>
      {map(recipes, (recipe) => (
        <FavoritesList key={recipe.id} recipe={recipe}/>
      ))}
    </ScrollView>
  );
}
