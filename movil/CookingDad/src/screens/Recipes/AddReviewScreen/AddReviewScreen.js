import React from "react";
import { View } from "react-native";
import { useFormik } from "formik";
import { AirbnbRating, Input, Button } from "react-native-elements";
import Toast from "react-native-toast-message";
import { v4 as uuid } from "uuid";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { map, mean } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../utils";
import { screen } from "../../../utils";
import { initialValues, validationSchema } from "./AddReviewScreen.data";
import { styles } from "./AddReviewScreen.styles";

export function AddReviewScreen(props) {
  const { route } = props;
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = uuid();
        const newData = formValue;
        newData.id = idDoc;
        newData.idRecipe = route.params.idRecipe;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();

        await setDoc(doc(db, "comentarios", idDoc), newData);
        await updateRestaurant();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al enviar la review",
        });
      }
    },
  });

  const updateRestaurant = async () => {
    const q = query(
      collection(db, "comentarios"),
      where("idRecipe", "==", route.params.idRecipe)
    );

    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;
      const arrayStars = map(reviews, (review) => review.data().rating);
      
      const media = mean(arrayStars);

      const restaurantRef = doc(db, "recetas", route.params.idRecipe);

      await updateDoc(restaurantRef, {
        ratingMedia: media,
      });

      navigation.navigate(screen.recipes.recipe, {id: route.params.idRecipe});
      
    });
  };

  return (
    <View style={styles.content}>
      <View>
        <View>
          <AirbnbRating
            count={5}
            reviews={[
              "Pesima",
              "Deficiente",
              "Normal",
              "Muy buena",
              "Excelente",
            ]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
          />
        </View>
        <View>
          <Input
            placeholder="Titulo"
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          />
        </View>
      </View>

      <Button
        title="Enviar review"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
