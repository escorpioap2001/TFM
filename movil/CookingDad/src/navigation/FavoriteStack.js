import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoriteScreen } from "../screens/FavoritesScreen";
import { screen } from "../utils/screenName";
const Stack = createNativeStackNavigator();

export function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.favorites.favorites}
        component={FavoriteScreen}
        options={{ title: "Favoritos", headerTitleAlign:"center" }}
      />
    </Stack.Navigator>
  );
}
