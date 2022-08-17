import React,{useState} from 'react';
import { Text, View,TextInput, SafeAreaView,Button } from 'react-native';
import axios from 'axios';
import { setUser } from '../../Redux/Action/Actions';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const userdetails = {
    email:email,
    password:password
  }
  const handleLogin = () => {
    console.log(userdetails);
    axios.post('https://nirmameetsbackend.herokuapp.com/login',{
      email:email,
      password:password
    }).then(res => {
      
      if(res.status===200){
        dispatch(
          setUser(
            res.data.Name,
            res.data.email,
            res.data.Department,
            res.data.token,
            true
          )
        )
      }
    });
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
        <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:40,color:'white',fontWeight:'700'}}>NirmaMeets</Text>
        </View>
        <View style={{flex:1,alignItems:'center'}}>
        <TextInput style={{height:50,width:'80%',backgroundColor:'white',borderRadius:20,paddingHorizontal:10}} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput style={{height:50,width:'80%',backgroundColor:'white',borderRadius:20,marginTop:30,paddingHorizontal:10}} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} />
        <Button title="Login" onPress={handleLogin}/>
        <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
    </SafeAreaView>
  );
}
