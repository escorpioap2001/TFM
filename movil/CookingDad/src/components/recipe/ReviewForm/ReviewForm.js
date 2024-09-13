import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {query, collection, where, onSnapshot} from "firebase/firestore"
import {size} from "lodash"
import { db } from "../../../utils";
import { styles } from "./ReviewForm.styles";

export function ReviewForm(props) {
  const { idRecipe } = props;
  const [hasLogged, setHasLogged] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "comentarios"),
        where("idRecipe", "==", idRecipe),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (snapshot) => {
        if (size(snapshot.docs) > 0) setHasReview(true);
      });
    }
  }, [hasLogged]);

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, {
      screen: screen.account.login,
    });
  };

  const goToReview = () => {
    navigation.navigate(screen.recipes.review, {idRecipe});
  };

  if(hasLogged && hasReview)
  {
    return(
      <View style={styles.content}>
        <Text style={styles.textSendReview}>
          Ya has enviado un comentario sobre esta receta
        </Text>
      </View>
    )
  }

  return (
    <View>
      {hasLogged ? (
        <Button
          title="Escribe una opinión"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#5353ec",
          }}
          buttonStyle={styles.button}
          titleStyle={styles.btnText}
          onPress={goToReview}
        />
      ) : (
        <Text style={styles.text} onPress={goToLogin}>
          Para escribir una opinión es necesario estas logeado{" "}
          <Text style={styles.textClick}>pulsa AQUÍ para iniciar sesión</Text>
        </Text>
      )}
    </View>
  );
}
