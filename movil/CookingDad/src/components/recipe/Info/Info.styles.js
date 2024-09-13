import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    marginHorizontal: 15,
    marginTop: 0,
    borderTopColor: "#DDDDDD",
    borderTopWidth:1
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  explication: {
    marginHorizontal: 15,
    fontSize:16
  },
  nature: {
    width: "100%",
    height: 220,
    borderWidth: 4,
    borderColor: "#5353ec",
    borderRadius: 10,
    resizeMode: "cover",
    alignContent: "center",
    paddingVertical:10
  },

  bold:{
    fontWeight: "bold",
    fontSize:18
  }
});