import React from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import {
  InfoForm,
  UploadImagesForm,
  ImageRecipe,
} from "../../../components/recipes/AddRecipe";
import { styles } from "./AddRecipesScreen.styles";
import { initialVales, validationSchema } from "./AddRecipesScreen.data";

export function AddRecipesScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialVales(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid();
        newData.createdAt = new Date();

        await setDoc(doc(db, "recetas", newData.id), newData);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <ScrollView>
      <ImageRecipe formik={formik} />
      <InfoForm formik={formik} />
      <UploadImagesForm formik={formik} />
      <Button
        title="Crear receta"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
