import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
  },
  ingredientescontent: {
    marginBottom: 20,
    borderColor: '#5353ec',
    borderWidth: 3,
    borderRadius: 3,
    marginHorizontal: 10,
    paddingBottom:10
  },
  pasoscontent: {
    padding:20,
    marginHorizontal: 10,
    borderWidth:3,
    borderColor: "#5353ec",
    borderRadius:20,
    borderCurve: "circular"
  },
  pasos: {
    paddingHorizontal:20,
    paddingTop:10,
    marginVertical:10,
    borderWidth:1,
    borderColor: "black",
  },
  pasosText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 1,
    marginBottom: 1,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  dropdown: {
    paddingLeft:10,
    height: 60,
    backgroundColor: 'transparent',
    borderColor: '#5353ec',
    borderBottomWidth: 3,
    marginBottom:10,
    
  },
  nutritionList: {
    paddingLeft:10,
    height: 50,
    backgroundColor: 'transparent',
    borderColor: '#5353ec',
    borderBottomWidth: 3,
    marginBottom:40,
    fontSize: 18,
    fontWeight: "bold"
  },
  placeholderStyle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 40,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  delete: {
    right:-120,

  },
  selectedStyle: {
    borderRadius: 12,
  },
  selectedItemContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    //paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedItemText: {
    fontSize: 16,
    marginRight: 10,
  },
  nutritionText:{
    fontSize: 16,
    marginRight: 30,
    fontWeight: "bold"
  },
  selectedItemRow: {
    height:40,
    maxWidth:300,
    flexDirection: 'row',
    justifyContent: 'flex-start', // Aligns elements to the left
    flex: 0, // Makes the view not take up any space
  },
  nutritionItemRow: {
    height:50,
    maxWidth:200,
    flexDirection: 'row',
    justifyContent: "space-between", // Aligns elements to the left
    flex: 0, // Makes the view not take up any space
  },
  quantityInput: {
    height: 40,
    textAlign: "center",
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    //borderBottomWidth: 0,
  },
  nutritionInput: {
    height: 40,
    textAlign: "center",
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    borderBottomWidth: 0,
  },
  inputContainer: {
    flex: 1,
    width: 100,
    maxHeight: 40,
  },
  addPaso: {
    backgroundColor: "#5353ec",
    margin: 20,
  },
  errorText:{
    color:"red",
    fontSize:12,
  }
});
