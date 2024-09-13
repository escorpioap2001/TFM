import React from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RegisterForm } from "../../../components/auth/RegisterForm/RegisterForm";
import { styles } from "./RegisterScreen.styles";

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../../assets/img/cookingdad.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <RegisterForm></RegisterForm>
      </View>
    </KeyboardAwareScrollView>
  );
}
