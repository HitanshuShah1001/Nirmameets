import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  Pressable,
  Image
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { PASSWORD_VALIDATOR } from "../../Validators/Password";
import { EAMIL_VALIDATOR } from "../../Validators/Email";

import mime from "mime";

export default function SignUp(props) {
  
  const navigation = useNavigation();
  const [name, setName] = useState("Dummy");
  const [Username, setUsername] = useState("Dummy2");
  const [email, setEmail] = useState("Dummy2@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [profilephoto,setProfilephoto] = useState("");
  const [Field, setField] = useState("");

  const fieldValidation =
    name !== "" &&
    Username !== "" &&
    email !== "" &&
    password !== "" &&
    confirmpassword !== "" &&
    Field !== "";
  const handleSignUp = () => {
    if (fieldValidation === false) {
      Alert.alert("Please fill all the fields.");
    } else if (password != confirmpassword) {
      Alert.alert("Passwords do not match");
    } else if (!EAMIL_VALIDATOR.test(email)) {
      Alert.alert("Please enter a valid email!");
    } else if (!PASSWORD_VALIDATOR.test(password)) {
      Alert.alert(
        "Passwords should be atleast 8 characters long with a combination of lowercase,uppercase letters and a Number"
      );
    } else {
      const newImage = "file:///" + profilephoto.split("file:/").join("");
      console.log(newImage);
      let formData = new FormData();
      formData.append("Profilephoto",{
        uri:profilephoto,
        type:mime.getType(profilephoto),
        name:profilephoto.split("/").pop()

      });
      formData.append("Name",name);
      formData.append("Username",Username);
      formData.append("email",email);
      formData.append("password",password);
      formData.append("Field",Field);

      const config = {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }

      axios
        .post("http://localhost:443/register",
          formData,config
        )
        .then((res) => {
          if (res.data.message !== "User created succesfully") {
            Alert.alert(res.data.message);
          } else {
            Alert.alert(res.data.message);
            navigation.navigate("Login");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    if(props.route?.params?.params?.photo?.uri !== null &&  props.route?.params?.params?.photo?.uri !== undefined){
      setProfilephoto(props.route.params.params.photo.uri);
    }
  },[props.route?.params?.params?.photo?.uri])
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{ flex: 0.3, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 40, color: "white", fontWeight: "700" }}>
          NirmaMeets
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Pressable onPress={() => navigation.navigate('CameraScreen')}>
          {profilephoto!=="" && (
            <Image source={{uri:profilephoto}} style={{height:80,width:80,borderRadius:20}} />
          )}
          {profilephoto==="" && (
            <View style={{height:80,width:80,borderRadius:20,backgroundColor:'grey'}} />
          )}

        </Pressable>
        <TextInput
          style={{
            height: 50,
            width: "80%",
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={{
            height: 50,
            width: "80%",
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 10,
            marginTop: 30,
          }}
          placeholder="Username"
          value={Username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={{
            height: 50,
            width: "80%",
            backgroundColor: "white",
            borderRadius: 20,
            marginTop: 30,
            paddingHorizontal: 10,
          }}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{
            height: 50,
            width: "80%",
            backgroundColor: "white",
            borderRadius: 20,
            marginTop: 30,
            paddingHorizontal: 10,
          }}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TextInput
          style={{
            height: 50,
            width: "80%",
            backgroundColor: "white",
            borderRadius: 20,
            marginTop: 30,
            paddingHorizontal: 10,
          }}
          placeholder="Confirm password"
          value={confirmpassword}
          onChangeText={(text) => setConfirmpassword(text)}
          secureTextEntry
        />
        <Pressable onPress={() => navigation.navigate('Fields')}>
        <Text style={{backgroundColor:'white'}}>Field</Text>
        </Pressable>
        <Button title="SignUp" onPress={handleSignUp} />
        <Button
          title="Already have an account? Log In"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
}
