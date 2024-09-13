import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import {screen, db} from "../../../utils"
import { styles } from "./FavoritesList.styles";

export function FavoritesList(props) {
  const { recipe } = props;
  const navigation = useNavigation();

  const goToRecipe = () => {
    navigation.navigate(screen.recipes.tab, {
        screen: screen.recipes.recipe,
        params: {
          id: recipe.id,
        },
      });
  };

  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favoritos", recipe.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToRecipe}>
      <View style={styles.content}>
        <Image source={{ uri: recipe.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{recipe.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={onRemoveFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
