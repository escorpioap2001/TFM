import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { RecipeStack } from "./RecipeStack";
import { FavoriteStack } from "./FavoriteStack";
import { RankingStack } from "./RankingStack";
import { SearchStack } from "./SearchStack";
import { AccountStack } from "./AccountStack";
import { screen } from "../utils/screenName";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false ,
        tabBarActiveTintColor: "#5353ec",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
      })}
    >
      <Tab.Screen
        name={screen.recipes.tab}
        component={RecipeStack}
        options={{ title: "Recipes"}}
      />
      <Tab.Screen
        name={screen.favorites.tab}
        component={FavoriteStack}
        options={{ title: "Favorites" }}
      />
      <Tab.Screen
        name={screen.ranking.tab}
        component={RankingStack}
        options={{ title: "Ranking" }}
      />
      <Tab.Screen
        name={screen.search.tab}
        component={SearchStack}
        options={{ title: "Search" }}
      />
      <Tab.Screen
        name={screen.account.tab}
        component={AccountStack}
        options={{ title: "Account" }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(router, color, size) {
  let iconName;
  if (router.name == screen.recipes.tab) {
    iconName = "file-document-outline";
  }

  if (router.name == screen.favorites.tab) {
    iconName = "heart-outline";
  }

  if (router.name == screen.ranking.tab) {
    iconName = "crown-outline";
  }

  if (router.name == screen.search.tab) {
    iconName = "magnify";
  }

  if (router.name == screen.account.tab) {
    iconName = "home-outline";
  }

  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}
