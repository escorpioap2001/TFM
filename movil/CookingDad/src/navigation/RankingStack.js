import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RankingScreen } from "../screens/RankingScreen";
import { screen } from "../utils/screenName";
const Stack = createNativeStackNavigator();

export function RankingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.ranking.ranking}
        component={RankingScreen}
        options={{ title: "Ranking", headerTitleAlign:"center" }}
      />
    </Stack.Navigator>
  );
}
