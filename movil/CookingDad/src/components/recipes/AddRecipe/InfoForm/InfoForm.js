import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Icon, Button, Input } from "react-native-elements";
import { MultiSelect } from "react-native-element-dropdown";
import { MapForm } from "../MapForm";
import axios from "axios";
import { styles } from "./InfoForm.styles";

export function InfoForm(props) {
  const { formik } = props;
  const [ingredientes, setIngredientes] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [pasos, setPasos] = useState([{ label: "Paso 1", text: "" }]); // Estado para almacenar los pasos y los datos de los TextArea

  useEffect(() => {
    // Realizar la solicitud GET para obtener los ingredientes cuando se monte el componente
    obtenerIngredientes();
  }, []);

  const agregarPaso = () => {
    //console.log(formik.values.steps);
    const nuevoPaso = { label: `Paso ${pasos.length + 1}`, text: "" };
    setPasos([...pasos, nuevoPaso]);
    formik.setFieldValue(
      "steps",
      pasos.map((paso) => `${paso.text}`)
    );
  };

  const quitarPaso = (index) => {
    const nuevosPasos = pasos.filter((_, i) => i != index); // Filtra los pasos excluyendo el paso en el índice especificado

    const pasosActualizados = nuevosPasos.map((paso, idx) => ({
      ...paso,
      label: `Paso ${idx + 1}`,
    }));
    setPasos(pasosActualizados);
  };

  const handlePasoChange = (text, index) => {
    const nuevosPasos = [...pasos];
    nuevosPasos[index].text = text;
    setPasos(nuevosPasos);
  };

  const obtenerIngredientes = async () => {
    try {
      // Guardar los ingredientes en el estado local
      const response = await axios.get(
        "http://192.168.1.49:8080/plc-pls-mps-tutorial/ingredientes.html"
      );
      const transformedIngredients = response.data.map((ingrediente) => ({
        value: ingrediente.nombre,
        label: ingrediente.nombre,
        image: {
          uri: `${ingrediente.tipo}.png`,
        },
        category: ingrediente.tipo,
        cantidad: "0",
      }));

      // Guardar los ingredientes transformados en el estado local
      setData(transformedIngredients);
    } catch (error) {
      console.error("Error al obtener los ingredientes:", error);
    }
  };

  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Nombre de la receta"
          onChangeText={(text) => formik.setFieldValue("name", text)}
          errorMessage={formik.errors.name}
        />

        <Input
          placeholder="Descripción de la receta"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue("description", text)}
          errorMessage={formik.errors.description}
        />

        <Input
          placeholder="Número de porciones"
          keyboardType="numeric"
          onChangeText={(text) => formik.setFieldValue("servings", text)}
          errorMessage={formik.errors.servings}
          rightIcon={{
            type: "material-community",
            name: "food",
            color: getColorIconMap(formik),
          }}
        />

        <Input
          placeholder="Horas:Minutos (Preparación)"
          onChangeText={(text) => formik.setFieldValue("time", text)}
          errorMessage={formik.errors.time}
          rightIcon={{
            type: "material-community",
            name: "timer-outline",
            color: getColorIconMap(formik),
          }}
        />

        <View style={styles.ingredientescontent}>
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Seleccion ingredientes"
            searchPlaceholder="Buscar..."
            value={selected}
            onChange={(items) => {
              setSelected(items);
              const selectedData = selected.map((selectedItem) =>
                data.find((itemdata) => itemdata.value == selectedItem)
              );
              formik.setFieldValue("ingredients", selectedData);
            }}
            renderSelectedItem={(item) => (
              <View style={styles.selectedItemContainer}>
                <ScrollView horizontal>
                  <Text style={styles.selectedItemText}>{item.label}</Text>
                  <View style={styles.selectedItemRow}>
                    <Input
                      style={styles.quantityInput}
                      value={item.cantidad}
                      onChangeText={(text) => {
                        const updatedData = data.map((obj) =>
                          obj.value == item.value
                            ? { ...obj, cantidad: text || "" }
                            : obj
                        );
                        // Actualizar el estado de 'data' con la nueva cantidad
                        setData(updatedData);
                      }}
                      onBlur={() => {
                        const selectedData = selected.map((selectedItem) =>
                          data.find(
                            (itemdata) => itemdata.value == selectedItem
                          )
                        );
                        formik.setFieldValue("ingredients", selectedData);
                      }}
                      placeholder="Cantidad"
                    />
                  </View>
                </ScrollView>
              </View>
            )}
            selectedStyle={styles.selectedStyle}
          />
          {formik.errors.ingredients && (
            <View style={styles.selectedItemContainer}>
              <Text style={styles.errorText}>{formik.errors.ingredients}</Text>
            </View>
          )}
        </View>

        <View style={styles.pasoscontent}>
          {pasos.map((paso, index) => (
            <View key={index} style={styles.pasos}>
              <Icon
                type="material-community"
                name="delete"
                size={25}
                containerStyle={styles.delete}
                onPress={() => {
                  quitarPaso(index);
                }}
              />
              <Text style={styles.pasosText}>{paso.label}</Text>
              <Input
                placeholder="Ingrese el paso"
                onChangeText={(text) => handlePasoChange(text, index)}
                onBlur={() =>
                  formik.setFieldValue(
                    "steps",
                    pasos.map((paso) => `${paso.text}`)
                  )
                }
                value={paso.text}
                multiline={true}
              />
            </View>
          ))}
          {formik.errors.steps && (
            <Text style={styles.errorText}>{formik.errors.steps}</Text>
          )}
        </View>

        {/* Botón para agregar más pasos */}
        <Button
          title="Agregar Paso"
          buttonStyle={styles.addPaso}
          onPress={agregarPaso}
        />

        <Input
          placeholder="Tips de la receta (opcional)"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue("tips", text)}
          errorMessage={formik.errors.tips}
        />

        <View style={styles.pasoscontent}>
          <Text style={styles.nutritionList}>
            Valor nutricional de una ración
          </Text>
          <View style={styles.nutritionItemRow}>
            <Text style={styles.nutritionText}>Calorias:</Text>
            <Input
              style={styles.nutritionInput}
              keyboardType="numeric"
              placeholder="Cantidad"
              onChangeText={(text) => formik.setFieldValue("calories", text)}
              errorMessage={formik.errors.calories}
            />
          </View>
          <View style={styles.nutritionItemRow}>
            <Text style={styles.nutritionText}>Grasa:</Text>
            <Input
              style={styles.nutritionInput}
              keyboardType="numeric"
              placeholder="Cantidad"
              onChangeText={(text) => formik.setFieldValue("fat", text)}
              errorMessage={formik.errors.fat}
            />
            <Text style={styles.selectedItemText}>g</Text>
          </View>
          <View style={styles.nutritionItemRow}>
            <Text style={styles.nutritionText}>Carbohidratos:</Text>
            <Input
              style={styles.nutritionInput}
              keyboardType="numeric"
              placeholder="Cantidad"
              onChangeText={(text) => formik.setFieldValue("carbohydrates", text)}
              errorMessage={formik.errors.carbohydrates}
            />
            <Text style={styles.selectedItemText}>g</Text>
          </View>
          <View style={styles.nutritionItemRow}>
            <Text style={styles.nutritionText}>Fibra:</Text>
            <Input
              style={styles.nutritionInput}
              keyboardType="numeric"
              placeholder="Cantidad"
              onChangeText={(text) => formik.setFieldValue("fiber", text)}
              errorMessage={formik.errors.fiber}
            />
            <Text style={styles.selectedItemText}>g</Text>
          </View>
          <View style={styles.nutritionItemRow}>
            <Text style={styles.nutritionText}>Azúcar:</Text>
            <Input
              style={styles.nutritionInput}
              keyboardType="numeric"
              placeholder="Cantidad"
              onChangeText={(text) => formik.setFieldValue("sugar", text)}
              errorMessage={formik.errors.sugar}
            />
            <Text style={styles.selectedItemText}>g</Text>
          </View>
          <View style={styles.nutritionItemRow}>
            <Text style={styles.nutritionText}>Proteina:</Text>
            <Input
              style={styles.nutritionInput}
              keyboardType="numeric"
              placeholder="Cantidad"
              onChangeText={(text) => formik.setFieldValue("protein", text)}
              errorMessage={formik.errors.protein}
            />
            <Text style={styles.selectedItemText}>g</Text>
          </View>
        </View>
      </View>
      <MapForm show={showMap} formik={formik} />
    </>
  );
}

const getColorIconMap = (formik) => {
  if (formik.errors.location) return "#ff0000";

  if (formik.values.location) return "#00a680";

  return "#c2c2c2";
};
