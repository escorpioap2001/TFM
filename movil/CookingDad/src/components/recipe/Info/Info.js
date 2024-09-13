import React, { useState } from "react";
import { View, Image } from "react-native";
import { Text, ListItem, Icon, Button } from "react-native-elements";
import { map } from "lodash";
import { styles } from "./Info.styles";

export function Info(props) {
  const { recipe } = props;
  const [contador, setContador] = useState(0);

  const minutosCalculados = () => {
    if (!recipe.time) return "0";
    const [horas, minutos] = recipe.time.split(":").map(Number);
    const totalMinutos = horas + " horas y " + minutos + " minutos";
    return totalMinutos;
  };

  const listInfo = [
    {
      text: minutosCalculados(),
      iconType: "material-community",
      iconName: "timer",
    },
  ];

  const incrementarPorciones = () => {
    setContador(contador + 1);
  };

  // Función para decrementar el número de porciones
  const decrementarPorciones = () => {
    if (parseInt(recipe.servings) + contador > 1) {
      setContador(contador - 1);
    }
  };

  const renderIngredientList = (numeroPorciones) => {
    // Verificar si hay ingredientes en la receta
    if (!recipe.ingredients || Object.keys(recipe.ingredients).length === 0) {
      return <Text>No hay ingredientes disponibles</Text>;
    }

    // Convertir el objeto de ingredientes en un array de arrays (clave, valor)
    const ingredientArray = Object.entries(recipe.ingredients);

    // Mapear cada par clave-valor de ingredientes y cantidades en una lista de elementos ListItem
    return ingredientArray.map(([key, value], index) => {
      // El nombre del ingrediente es la clave del objeto
      const nombre = value.label;
      // La cantidad del ingrediente es el valor asociado a la clave
      let cantidad = value.cantidad; // Obtener la cantidad original

      // Dividir la cadena en partes separadas por un espacio en blanco
      const partes = cantidad.split(" ");

      let cantidadNumerica = parseFloat(partes[0]); // Obtener la parte numérica como un número
      //console.log(cantidadNumerica);
      // Verificar si la cantidad numérica es un número válido
      if (!isNaN(cantidadNumerica)) {
        // Calcular la nueva cantidad multiplicando por (numeroPorciones / value.servings)
        const nuevaCantidadNumerica =
          cantidadNumerica * (numeroPorciones / parseInt(recipe.servings));
        // Reconstruir la cadena con la nueva cantidad numérica
        cantidad = `${nuevaCantidadNumerica} ${partes.slice(1).join(" ")}`;
      }
      const uri = "../../../../assets/img/" + value.image.uri;
      //console.log(`../../../../assets/img/${value.image.uri}`);
      return (
        <ListItem key={index} bottomDivider>
          {value.image.uri === "Aceites y grasas.png" ? (
            <Image
              source={require("../../../../assets/img/Aceites y grasas.png")}
              style={styles.image}
            />
          ) : value.image.uri === "Carnes.png" ? (
            <Image
              source={require("../../../../assets/img/Carnes.png")}
              style={styles.image}
            />
          ) : value.image.uri === "Endulzantes.png" ? (
            <Image
              source={require("../../../../assets/img/Endulzantes.png")}
              style={styles.image}
            />
          ) : value.image.uri === "Frutas.png" ? (
            <Image
              source={require("../../../../assets/img/Frutas.png")}
              style={styles.image}
            />
          ) : value.image.uri === "Frutos secos y semillas.png" ? (
            <Image
              source={require("../../../../assets/img/Frutos secos y semillas.png")}
              style={styles.image}
            />
          ) : value.image.uri === "Granos y cereales.png" ? (
            <Image
              source={require("../../../../assets/img/Granos y cereales.png")}
              style={styles.image}
            />
          ) : value.image.uri === "Legumbres y frijoles.png" ? (
            <Image
              source={require("../../../../assets/img/Legumbres y frijoles.png")}
              style={styles.image}
            />
          ) : value.image.uri === "Pescados y mariscos.png" ? (
            <Image
              source={require("../../../../assets/img/Pescados y mariscos.png")}
              style={styles.image}
            />
          ) : value.image.uri === "Productos lácteos.png" ? (
            <Image
              source={require("../../../../assets/img/Productos lácteos.png")}
              style={styles.image}
            />
          ) : value.image.uri === "Salsas y condimentos.png" ? (
            <Image
              source={require("../../../../assets/img/Salsas y condimentos.png")}
              style={styles.image}
            />
          ) : value.image.uri === "Vegetales.png" ? (
            <Image
              source={require("../../../../assets/img/Vegetales.png")}
              style={styles.image}
            />
          ) : null}
          <ListItem.Content>
            <ListItem.Title>{`${nombre} : ${cantidad}`}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      );
    });
  };

  const renderPasosList = () => {
    // Verificar si hay ingredientes en la receta
    if (!recipe.steps || Object.keys(recipe.steps).length === 0) {
      return <Text>No hay pasos</Text>;
    }

    // Convertir el objeto de ingredientes en un array de arrays (clave, valor)
    const pasosArray = Object.entries(recipe.steps);

    // Mapear cada par clave-valor de ingredientes y cantidades en una lista de elementos ListItem
    return pasosArray.map(([key, value], index) => {
      const texto = value;

      return (
        <ListItem key={index} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{`Paso ${index + 1}: ${texto}`}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      );
    });
  };

  return (
    <View style={styles.content}>
      {map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} color="#5353ec" />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.title}>Ingredientes para </Text>
        <Icon
          type="material-community"
          size={40}
          name="minus-circle-outline"
          color="#5353ec"
          onPress={decrementarPorciones}
        />
        <Text style={styles.title}>
          {" "}
          {parseInt(recipe.servings) + contador}{" "}
        </Text>
        <Icon
          type="material-community"
          size={40}
          name="plus-circle-outline"
          color="#5353ec"
          onPress={incrementarPorciones}
        />
      </View>

      {renderIngredientList(parseInt(recipe.servings) + contador)}
      <Text style={styles.title}>Paso por paso</Text>
      {renderPasosList()}
      {recipe.tips != "" && recipe.tips != null ? (
        <>
          <Text style={styles.title}>Consejos</Text>
          <Text style={styles.explication}>{recipe.tips}</Text>
        </>
      ) : null}
      {recipe.calories ||
      recipe.fat ||
      recipe.carbohydrates ||
      recipe.fiber ||
      recipe.sugar ||
      recipe.protein ? (
        <View>
          <Text style={styles.title}>Valor nutricional</Text>
          <View style={styles.nature}>
            <Text style={styles.explication}>
              <Text style={styles.bold}>Calorías: </Text> {recipe.calories}
            </Text>
            <Text style={styles.explication}>
              <Text style={styles.bold}>Grasas:</Text> {recipe.fat}{" "}
              {recipe.fat > 1 ? " gramos" : " gramo"}
            </Text>
            <Text style={styles.explication}>
              <Text style={styles.bold}>Carbohidratos:</Text>{" "}
              {recipe.carbohydrates}
              {recipe.carbohydrates > 1 ? " gramos" : " gramo"}
            </Text>
            <Text style={styles.explication}>
              <Text style={styles.bold}>Fibra:</Text> {recipe.fiber}
              {recipe.fiber > 1 ? " gramos" : " gramo"}
            </Text>
            <Text style={styles.explication}>
              <Text style={styles.bold}>Azúcares:</Text> {recipe.sugar}
              {recipe.sugar > 1 ? " gramos" : " gramo"}
            </Text>
            <Text style={styles.explication}>
              <Text style={styles.bold}>Proteínas:</Text> {recipe.protein}
              {recipe.protein > 1 ? " gramos" : " gramo"}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
