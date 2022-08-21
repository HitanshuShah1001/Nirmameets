import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { PASSWORD_VALIDATOR } from "../../Validators/Password";
import { EAMIL_VALIDATOR } from "../../Validators/Email";

export default function SignUp() {
  const navigation = useNavigation();
  const [name, setName] = useState("Dummy");
  const [Username, setUsername] = useState("Dummy2");
  const [email, setEmail] = useState("Dummy2@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmpassword, setConfirmpassword] = useState("");
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
      axios
        .post("http://localhost:443/register", {
          Name: name,
          Username: Username,
          email: email,
          password: password,
          Field: Field,
        })
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
        <TextInput
          style={{
            height: 50,
            width: "80%",
            backgroundColor: "white",
            borderRadius: 20,
            marginTop: 30,
            paddingHorizontal: 10,
          }}
          placeholder="Field"
          value={Field}
          onChangeText={(text) => setField(text)}
        />
        <Button title="SignUp" onPress={handleSignUp} />
        <Button
          title="Already have an account? Log In"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
}
