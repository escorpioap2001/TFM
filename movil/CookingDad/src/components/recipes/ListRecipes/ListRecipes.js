import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Image, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";
import { styles } from "./ListRecipes.styles";

export function ListRecipes(props) {
  const { recetas } = props;

  const navigation = useNavigation();

  const goToRestaurant = (recipe) => {
    navigation.navigate(screen.recipes.recipe, { id: recipe.id });
  };

  return (
    <FlatList
      data={recetas}
      renderItem={(doc) => {
        const recipe = doc.item.data();

        const minutosCalculados = (horario) => {
          if (!horario) return "0";
          const [horas, minutos] = horario.split(":").map(Number);
          const totalMinutos = horas * 60 + minutos;
          return totalMinutos;
        };

        const calcularDisficultad = (recipe) => {
          let puntaje = 0;
        
          // Evaluación del tiempo total
          const tiempoTotal = minutosCalculados(recipe.time);
          if (tiempoTotal > 120) {
            puntaje += 5;
          } else if (tiempoTotal > 60)
          {
            puntaje += 3;
          }
        
          // Evaluación de la cantidad de pasos
          const cantidadPasos = recipe.steps.length;
          if (cantidadPasos > 5) {
            puntaje += 2;
          }
        
          // Evaluación de la complejidad de los ingredientes
          const cantidadIngredientes = recipe.ingredients.length;
          if (cantidadIngredientes > 10) {
            puntaje += 2;
          } else if (cantidadIngredientes > 5) {
            puntaje += 1;
          }
          
          if (puntaje >= 6) {
            return "dificil"; 
          } else if (puntaje >= 3) {
            return "normal"; 
          } else {
            return "facil"; 
          }
        }

        return (
          <TouchableOpacity onPress={() => goToRestaurant(recipe)}>
            <View style={styles.recipes}>
              <Image source={{ uri: recipe.images[0] }} style={styles.image} />

              <View>
                <Text style={styles.name}>{recipe.name}</Text>
                <Text style={styles.info}>
                  {minutosCalculados(recipe.time)} minutos
                </Text>
                {calcularDisficultad(recipe) == "dificil" ? (
                  <Button
                    title="Dificil"
                    containerStyle={styles.dificultad}
                    buttonStyle={styles.dificil}
                    titleStyle={{ fontSize:14,color: "#ffffff" }}
                    onPress={() => {
                      console.log("");
                    }}
                  />
                ) : calcularDisficultad(recipe) == "normal" ? (
                  <Button
                    title="Normal"
                    containerStyle={styles.dificultad}
                    buttonStyle={styles.medio}
                    titleStyle={{ fontSize:14,color: "#ffffff" }}
                    onPress={() => {
                      console.log("");
                    }}
                  />
                ) : (
                  <Button
                    title="Facil"
                    containerStyle={styles.dificultad}
                    buttonStyle={styles.facil}
                    titleStyle={{fontSize:14, color: "#646464" }}
                    onPress={() => {
                      console.log("");
                    }}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
