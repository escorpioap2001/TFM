import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Image, Rating, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {screen} from "../../../utils"
import { styles } from "./RecipesRanking.styles";

export function RecipesRanking(props) {
  const { index, recipe } = props;
  const navigation = useNavigation();

  const goToRecipe = () => {
    navigation.navigate(screen.recipes.tab, {
        screen: screen.recipes.recipe,
        params: {
          id: recipe.id,
        },
      });
  };

  const renderMedal = () => {
    if (index > 2) return null;

    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="crown-circle-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  return (
    <TouchableOpacity onPress={goToRecipe}>
      <View style={styles.content}>
        <Image source={{ uri: recipe.images[0] }} style={styles.image} />

        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{recipe.name}</Text>
          </View>
          <Rating imageSize={15} readonly startingValue={recipe.ratingMedia} />
        </View>
        <Text style={styles.description}>{recipe.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
