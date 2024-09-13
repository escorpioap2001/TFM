import React from "react";
import { View } from "react-native";
import { Text, Rating } from "react-native-elements";
import { styles } from "./Header.styles";

export function Header(props) {
  const { recipe } = props;

  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={recipe.ratingMedia | 0}
        />
      </View>
      <Text style={styles.description}>{recipe.description}</Text>
    </View>
  );
}