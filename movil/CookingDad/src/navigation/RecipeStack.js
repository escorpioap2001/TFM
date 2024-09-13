import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecipesScreen } from "../screens/Recipes/RecipesScreen/RecipesScreen";
import { AddRecipesScreen } from "../screens/Recipes/AddRecipesScreen";
import { RecipeScreen } from "../screens/Recipes/RecipeScreen";
import { AddReviewScreen } from "../screens/Recipes/AddReviewScreen/AddReviewScreen";
import { screen } from "../utils/screenName";
const Stack = createNativeStackNavigator();

export function RecipeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.recipes.recipes}
        component={RecipesScreen}
        options={{ title: "Recetas", headerTitleAlign:"center" }}
      />
      <Stack.Screen
        name={screen.recipes.addRecipe}
        component={AddRecipesScreen}
        options={{ title: "Añadir Receta", headerTitleAlign:"center" }}
      />
      <Stack.Screen
        name={screen.recipes.recipe}
        component={RecipeScreen}
        options={{ title: "Receta", headerTitleAlign:"center" }}
      />
      <Stack.Screen
        name={screen.recipes.review}
        component={AddReviewScreen}
        options={{ title: "Comentario", headerTitleAlign:"center" }}
      />
    </Stack.Navigator>
  );
}
