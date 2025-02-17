import React from "react";
import { Text, View } from "react-native";
import { Image } from "react-native-elements";
import { styles } from "./ImageRecipe.styles";

export function ImageRecipe(props) {
  const { formik } = props;

  const primaryImage = formik.values.images[0];
  return (
    <View style={styles.content}>
      <Image
        source={
          primaryImage
            ? { uri: primaryImage }
            : require("../../../../../assets/img/image-not-found.jpg")
        }
        style={styles.image}
      />
    </View>
  );
}
