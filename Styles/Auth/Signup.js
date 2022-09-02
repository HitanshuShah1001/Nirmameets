import { StyleSheet } from "react-native";
import {
  TEXTCOLOR,
  TNHEIGHT,
  TNCOLOR,
} from "../../Utilities/auth";

export const styles = StyleSheet.create({

  textinput: {
    height: TNHEIGHT,
    width: "100%",
    backgroundColor: TNCOLOR,
    borderRadius: 15,
    paddingHorizontal: 10,
    color: TEXTCOLOR,
    borderWidth: 1,
    overflow: "hidden",
  },

  title:{
    fontSize: 40, 
    color: "white", 
    fontWeight: "700",
    marginBottom:15
  },

  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  label: {
    color: "white",
    marginTop: 30,
    paddingHorizontal: 10,
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 60,
  },

  placeholder: {
    height: 100,
    width: 100,
    borderRadius: 60,
    backgroundColor: "grey",
    justifyContent:'flex-end'
  },

  safeareaview:{
    flex: 1, 
    backgroundColor: "black" 
  },

  subcontainer:{
    flex: 0.3, 
    alignItems: "center", 
    justifyContent: "center"
  }
});
