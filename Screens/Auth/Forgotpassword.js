import axios from "axios";
import React,{useState,useEffect} from "react";
import {View,Text,TextInput, SafeAreaView, Alert} from 'react-native';
import { Button } from "react-native-paper";
import { TNHEIGHT,TNCOLOR,TEXTCOLOR } from "../../Utilities/auth";
import { PASSWORD_VALIDATOR } from "../../Validators/Password";

export default function Forgotpassword(props) {


    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmpassword] = useState('');


    useEffect(() => {
      console.log(props);
    
      
    }, [])
    
    const changepassword = () => {
        if(password!==confirmpassword){
            Alert.alert('Passwords do not match');
        }
        else if (!PASSWORD_VALIDATOR.test(password)) {
            Alert.alert(
              "Passwords should be atleast 8 characters long with a combination of lowercase,uppercase letters and a Number"
            );
          }
          else{
            axios.post('http://localhost:443/changepassword',{
                password:password,
                email:props.route.params.email
            }).then(res => {
                console.log(res.data);
                Alert.alert(res.data.message)
            }).catch(error => {
                console.log(error.response);
            })
          }
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <View style={{flex:1}}>
                <TextInput placeholder="Enter password " value={password} onChangeText={(text) => setPassword(text)} style={{height:TNHEIGHT,backgroundColor:TNCOLOR,width:'80%',alignSelf:'center',borderRadius:15,paddingHorizontal:15,color:TEXTCOLOR,marginTop:20}} />
                <TextInput placeholder="Confirm password" value={confirmpassword} onChangeText={(text) => setConfirmpassword(text)} style={{height:TNHEIGHT,backgroundColor:TNCOLOR,width:'80%',alignSelf:'center',borderRadius:15,paddingHorizontal:15,color:TEXTCOLOR,marginTop:20}} />
                <Button mode="contained" style={{width:200,alignSelf:'center',marginTop:40}} onPress={changepassword}>Change Password</Button>
            </View>
        </SafeAreaView>
    )
}