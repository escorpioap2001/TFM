import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { size, forEach } from "lodash";
import { db } from "../../../utils";
import { styles } from "./BtnFavorite.styles";

export function BtnFavorite(props) {
  const { idRecipe } = props;
  const auth = getAuth();
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(null);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getFavorites();

      if (size(response) > 0) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    })();
  }, [idRecipe, isReload]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const onReload = () => setIsReload((prevState) => !prevState);

  const getFavorites = async () => {
    const q = query(
      collection(db, "favoritos"),
      where("idRecipe", "==", idRecipe),
      where("idUser", "==", auth.currentUser.uid)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  const addFavorite = async () => {
    try {
      const idFavorite = uuid();
      const data = {
        id: idFavorite,
        idRecipe,
        idUser: auth.currentUser.uid,
      };
      await setDoc(doc(db, "favoritos", idFavorite), data);
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await getFavorites();
      forEach(response, async (item) => {
        await deleteDoc(doc(db, "favoritos", item.id));
        onReload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <View style={styles.content}>
      {currentUser && (
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "#f00" : "#000"}
          size={35}
          onPress={isFavorite ? removeFavorite : addFavorite}
        />
      )}
    </View>
  );
}
