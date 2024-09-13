import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Image, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import {screen} from "../../../utils"
import { styles } from "./UserGuestScreen.styles";

export function UserGuestScreen() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  }
  return (
    <ScrollView centerContent={true} style={styles.body}>
      <Image
        source={require("../../../../assets/img/user-guest.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Consultar tu perfil de CookingDad</Text>
      <Text style={styles.description}>
        ¿Como descrubrir la receta adecuada para cada situación? Busca y
        visualiza las mejores recetas de una forma sencilla, vota cual te ha
        gustado más y comenta como ha sito tu experiencia en la cocina.
      </Text>
      <View>
        <Button title='Ver tu perfil' onPress={goToLogin} buttonStyle={styles.loginButton}/>
      </View>
    </ScrollView>
  );
}
