import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { Carousel, Loading } from "../../../components/shared";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {Header, Info, ReviewForm, ReviewList, BtnFavorite} from "../../../components/recipe"
import { db } from "../../../utils";
import { styles } from "./RecipeScreen.styles";

export function RecipeScreen(props) {
  const { route } = props;
  const [recipe, setRecipe] = useState(null);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    setRecipe(null);
    onSnapshot(doc(db, "recetas", route.params.id), (doc) => {
      setRecipe(doc.data());
    });
  }, [route.params.id]);

  if (!recipe) return <Loading show text="Cargando receta"/>;

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={recipe.images} height={250} width={width} />
      <Header recipe={recipe} />
      <Info recipe={recipe} />
      <ReviewForm idRecipe={recipe.id}/>
      <ReviewList idRecipe={recipe.id}/>
      <BtnFavorite idRecipe={recipe.id}/>
    </ScrollView>
  );
}
