import React, { useState } from "react";
import { View } from "react-native";
import { useFormik } from "formik";
import { Input, Button } from "react-native-elements";
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import Toast from "react-native-toast-message";
import { validationSchema, initialValues } from "./DisplayEmailForm.data";
import { styles } from "./DisplayEmailForm.styles";

export function DisplayEmailForm(props) {
  const { onClose, onReload } = props;
  const [showPass, setShowPass] = useState(false);

  const onShowPassword = () => setShowPass((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;

        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          formValue.password
        );
        reauthenticateWithCredential(currentUser, credentials);

        await updateEmail(currentUser, formValue.email);

        onReload();
        onClose();
      } 
      catch (error) 
      {
        console.log(error);
        console.log(formValue);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el email",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nuevo email"
        containerStyle={styles.btnContainer}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPass ? false : true}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
        rightIcon={{
          type: "material-community",
          name: showPass ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
      />
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
