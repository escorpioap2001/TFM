import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { ListRecipes } from "../../../components/recipes";
import { LoadingModel } from "../../../components/shared";
import { screen, db } from "../../../utils";
import { styles } from "./RecipesScreen.styles";

export function RecipesScreen(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "recetas"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  const goToAddRestaurant = () => {
    navigation.navigate(screen.recipes.addRecipe);
    //navigation.navigate(screen.account.tab, {screen: screen.account.account});
  }

  return (
    <View style={styles.content}>
      {!restaurants ? (
        <LoadingModel show text="Cargando recetas" />
      ) : (
        <ListRecipes recetas={restaurants}/>
      )}
      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#5353ec"
          containerStyle={styles.btnContainer}
          onPress={goToAddRestaurant}
        />
      )}
    </View>
  );
}
