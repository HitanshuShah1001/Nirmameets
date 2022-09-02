import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { PASSWORD_VALIDATOR } from "../../Validators/Password";
import { EAMIL_VALIDATOR } from "../../Validators/Email";
import { TNCOLOR,BORDERCOLOR,BLURBORDERCOLOR } from "../../Utilities/auth";
import mime from "mime";
import { styles } from "../../Styles/Auth/Signup";

export default function SignUp(props) {
  const navigation = useNavigation();
  const [name, setName] = useState("Dummy");
  const [Username, setUsername] = useState("Dummy2");
  const [email, setEmail] = useState("Dummy2@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [profilephoto, setProfilephoto] = useState("");
  const [Field, setField] = useState("");
  const [namebordercolor, setNamebordercolor] = useState(BLURBORDERCOLOR);
  const [usernamebordercolor, setUsernamebordercolor] = useState(BLURBORDERCOLOR);
  const [emailbordercolor, setEmailbordercolor] = useState(BLURBORDERCOLOR);
  const [passwordbordercolor, setPasswordbordercolor] = useState(BLURBORDERCOLOR);
  const [confirmpasswordbordercolor, setConfirmpasswordbordercolor] = useState(BLURBORDERCOLOR);
  const [fieldbordercolor, setFieldbordercolor] = useState(BLURBORDERCOLOR);
  

  useEffect(() => {
    setField(props.route?.params?.params?.field);
  }, [props.route?.params?.params?.field]);

  const fieldValidation =
    name !== "" &&
    Username !== "" &&
    email !== "" &&
    password !== "" &&
    confirmpassword !== "" &&
    Field !== "";

  const handleNamefocus = () => {
    setNamebordercolor(BORDERCOLOR)
  };

  const handleNameBlur = () => {
    setNamebordercolor(BLURBORDERCOLOR);
  }

  const handleUsernamefocus = () => {
    setUsernamebordercolor(BORDERCOLOR)
  };

  const handleUsernameBlur = () => {
    setUsernamebordercolor(BLURBORDERCOLOR);
  }

  const handleEmailfocus = () => {
    setEmailbordercolor(BORDERCOLOR)
  };

  const handleEmailblur= () => {
    setEmailbordercolor(BLURBORDERCOLOR);
  }

  const handlePasswordfocus = () => {
    setPasswordbordercolor(BORDERCOLOR)
  };

  const handlePasswordblur = () => {
    setPasswordbordercolor(BLURBORDERCOLOR);
  }

  const handleCPfocus = () => {
    setConfirmpasswordbordercolor(BORDERCOLOR)
  };

  const handleCPblur = () => {
    setConfirmpasswordbordercolor(BLURBORDERCOLOR);
  }

  const handleFieldfocus = () => {
    setFieldbordercolor(BORDERCOLOR)
  };

  const handleFieldblur = () => {
    setFieldbordercolor(BLURBORDERCOLOR);
  }



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
      formData.append("Profilephoto", {
        uri: profilephoto,
        type: mime.getType(profilephoto),
        name: profilephoto.split("/").pop(),
      });
      formData.append("Name", name);
      formData.append("Username", Username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("Field", Field);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post("http://localhost:443/register", formData, config)
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
    if (
      props.route?.params?.params?.photo?.uri !== null &&
      props.route?.params?.params?.photo?.uri !== undefined
    ) {
      setProfilephoto(props.route.params.params.photo.uri);
    }
  }, [props.route?.params?.params?.photo?.uri]);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView>
        <View style={styles.subcontainer}>
          <Text style={styles.title}>SignUp</Text>
        </View>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.navigate("CameraScreen")}>
            {profilephoto !== "" && (
              <Image source={{ uri: profilephoto }} style={styles.image} />
            )}
            {profilephoto === "" && (
              <View style={styles.placeholder}>
                <Icon
                  name="add"
                  color="#ffffff"
                  size={43}
                  style={{ alignSelf: "flex-end", marginRight: -8 }}
                />
              </View>
            )}
          </Pressable>
          <View style={{ alignItems: "flex-start", width: "80%" }}>
            <Text style={styles.label}>NAME</Text>

            <TextInput
              style={[styles.textinput,{borderColor:namebordercolor}]}
              underlineColorAndroid="transparent"
              onFocus={handleNamefocus}
              onBlur={handleNameBlur}
              placeholderTextColor={TNCOLOR}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Text style={styles.label}>USERNAME</Text>
            <TextInput
              style={[styles.textinput,{borderColor:usernamebordercolor}]}
              placeholderTextColor={TNCOLOR}
              placeholder="Username"
              onFocus={handleUsernamefocus}
              onBlur={handleUsernameBlur}
              value={Username}
              onChangeText={(text) => setUsername(text)}
            />
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={[styles.textinput,{borderColor:emailbordercolor}]}
              placeholderTextColor={TNCOLOR}
              onFocus={handleEmailfocus}
              onBlur={handleEmailblur}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={[styles.textinput,{borderColor:passwordbordercolor}]}
              placeholderTextColor={TNCOLOR}
              onFocus={handlePasswordfocus}
              onBlur={handlePasswordblur}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <Text style={styles.label}>CONFIRM-PASSWORD</Text>
            <TextInput
              style={[styles.textinput,{borderColor:confirmpasswordbordercolor}]}
              placeholderTextColor={TNCOLOR}
              onFocus={handleCPfocus}
              onBlur={handleCPblur}
              placeholder="Confirm password"
              value={confirmpassword}
              onChangeText={(text) => setConfirmpassword(text)}
              secureTextEntry
            />
            <Text style={styles.label}>FIELD</Text>
            <Pressable
              onPress={() => navigation.navigate("Fields")}
              style={{ width: "100%" }}
            >
              <View style={styles.textinput}>
                <Text
                  style={{
                    color: "white",
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                >
                  {Field}
                </Text>
              </View>
            </Pressable>
          </View>

          <Button title="SignUp" onPress={handleSignUp} />
          <Button
            title="Already have an account? Log In"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
