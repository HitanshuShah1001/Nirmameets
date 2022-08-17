import React,{useState} from 'react';
import { Text, View,TextInput, SafeAreaView,Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function SignUp() {
  const navigation = useNavigation();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [Department,setDepartment] = useState("");
  

  const handleSignUp = () => {
    console.log('Entering');
    axios.post('https://nirmameetsbackend.herokuapp.com/register',{
      Name:name,
      email:email,
      password:password,
      Department:Department
    }).then(res => {
      console.log(res.data)
    }).catch(error => {
      console.log(error.message);
    })
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
        <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:40,color:'white',fontWeight:'700'}}>NirmaMeets</Text>
        </View>
        <View style={{flex:1,alignItems:'center'}}>
        <TextInput style={{height:50,width:'80%',backgroundColor:'white',borderRadius:20,paddingHorizontal:10}} placeholder="Name" value={name} onChangeText={(text) => setName(text)} />
        <TextInput style={{height:50,width:'80%',backgroundColor:'white',borderRadius:20,marginTop:30,paddingHorizontal:10}} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput style={{height:50,width:'80%',backgroundColor:'white',borderRadius:20,marginTop:30,paddingHorizontal:10}} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
        <TextInput style={{height:50,width:'80%',backgroundColor:'white',borderRadius:20,marginTop:30,paddingHorizontal:10}} placeholder="Department" value={Department} onChangeText={(text) => setDepartment(text)} />
        <Button title="SignUp" onPress={handleSignUp} />
        <Button title="Already have an account? Log In" onPress={() => navigation.navigate('Login')} />
        </View>
    </SafeAreaView>
  );
}
