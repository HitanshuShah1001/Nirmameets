import React,{useState} from 'react';
import { Text, View,TextInput, SafeAreaView,Button, Alert } from 'react-native';
import axios from 'axios';
import { setUser } from '../../Redux/Action/Actions';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { TNCOLOR,BORDERCOLOR,BLURBORDERCOLOR } from "../../Utilities/auth";
import { styles } from "../../Styles/Auth/Signup";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [emailbordercolor,setEmailbordercolor] = useState("");
  const [passwordbordercolor,setPasswordbordercolor] = useState("");

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


  const handleLogin = () => {
    console.log('In login')
    axios.post('http://localhost:443/login',{
      email:email,
      password:password 
    }).then(res => {
      console.log(res.data,'data');
      if(res.data.message==='Login Succesful'){
        dispatch(
          setUser(
            res.data.Name,
            res.data.email,
            res.data.token,
            res.data.Field,
            res.data.Username,
            res.data.Profilephoto,
            true
          )
        )
        
      }
      else{
        console.log(res.data,'res');
        Alert.alert(res.data)
      }
    }).catch(error => {
      Alert.alert(error.response.data.message);
    }) ;
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
        <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:40,color:'white',fontWeight:'700'}}>NirmaMeets</Text>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'flex-start'}}>
        <TextInput style={[styles.textinput,{width:'80%',borderColor:emailbordercolor}]} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} onFocus={handleEmailfocus}
              onBlur={handleEmailblur}/>
        <TextInput style={[styles.textinput,{width:'80%',marginTop:30,borderColor:passwordbordercolor}]} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} onFocus={handlePasswordfocus}
              onBlur={handlePasswordblur} secureTextEntry/>
        <Button title="Login" onPress={handleLogin}/>
        <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
    </SafeAreaView>
  );
}
