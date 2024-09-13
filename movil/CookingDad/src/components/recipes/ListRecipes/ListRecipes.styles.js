import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    recipes: {
    flexDirection: "row",
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  name: {
    fontWeight: "bold",
  },
  info: {
    color: "#828282",
    paddingRight: 100,
    marginTop: 3,
  },
  dificil: {
    backgroundColor:"#ED3E3E",
  },
  medio: {
    backgroundColor:"#FF8033",
  },
  facil: {
    backgroundColor:"#FFED38",
  },
  dificultad:{
    height:40,
    width: 150,
  }
});