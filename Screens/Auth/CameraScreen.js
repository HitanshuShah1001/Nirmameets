import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { Text, View, SafeAreaView, Pressable,StatusBar } from "react-native";
import { IconButton } from "react-native-paper";
import { styles } from "../../Styles/CameraScreenStyles";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  const navigation = useNavigation();
  const [gallerypermission, setGallerypermission] = useState(false);
  const [permission, setPermission] = useState(false);
  const [cameratype, setCameratype] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);

  const camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
      const status1 = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGallerypermission(status1.status === "granted");
    })();
  }, []);

  const takepicture = async () => {
    if (!permission) return;
    const photo = await camera.current.takePictureAsync();
    navigation.navigate("SignUp",{
        params:{ photo: photo }
    })
  };

  const pickImage = async () => {
    if (!gallerypermission) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 5],
      quality: 0.3,
    });
    if (!result.cancelled) {
        navigation.navigate("SignUp",{
            params:{ photo: result }
        })
    }
  };

  if (permission === false) {
    return <Text>No access to camera</Text>;
  }
  if (permission === null) {
    return <Text>Null</Text>;
  }
  if (gallerypermission === false) {
    return <Text>No access to Photos</Text>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      
      <View style={styles.container}>
        <Camera style={styles.camera} type={cameratype} ref={camera}>
          <View style={styles.buttonContainer}>
            <IconButton
              style={styles.buttonrightleft}
              icon="reload"
              color="#EF90A9"
              size={50}
              onPress={() => {
                cameratype === Camera.Constants.Type.back
                  ? setCameratype(Camera.Constants.Type.front)
                  : setCameratype(Camera.Constants.Type.back);
              }}
            />
            <IconButton
              style={styles.button}
              icon="camera"
              color="#EF90A9"
              size={80}
              onPress={takepicture}
            />
            <IconButton
              style={styles.buttonrightright}
              icon="image"
              color="#EF90A9"
              size={50}
              onPress={pickImage}
            />
          </View>
        </Camera>
      </View>
    </SafeAreaView>
  );
};



export default React.memo(CameraScreen);