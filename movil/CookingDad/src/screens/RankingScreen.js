import React, {useState, useEffect} from "react";
import { Text, ScrollView } from "react-native";
import {collection, query,limit, orderBy, onSnapshot} from "firebase/firestore"
import { db } from "../utils";
import {map} from "lodash"
import { RecipesRanking } from "../components/recipes";

export function RankingScreen() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "recetas"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );
    onSnapshot(q, (snapshot) => {
      setRecipes(snapshot.docs);
    });
  }, []);
  return (
    <ScrollView>
      {map(recipes, (recipes, index) => (
        <RecipesRanking
          key={index}
          index={index}
          recipe={recipes.data()}
        />
      ))}
    </ScrollView>
  );
}
