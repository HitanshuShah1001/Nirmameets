import React,{useState} from "react";
import {View,Text,TextInput, SafeAreaView, Alert,Button} from 'react-native';
import { TNHEIGHT,TNCOLOR } from "../../Utilities/auth";
import axios from "axios";

export default function CheckEmail() {

    const Checkemail = () => {
        console.log('In here');
        axios.post('http://localhost:443/checkemail',{
        email:email
    }).then(res => {
        console.log(res.data.user);
        Alert.alert(res.data.message);
    }).catch(error => {
        Alert.alert(error.response.message);
    })
    }
    

    const [email,setEmail] = useState('')
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <View style={{flex:1}}>
                <View style={{alignSelf:'center',width:'80%'}}>
                    <Text style={{fontWeight:'700',color:'white',fontSize:30,marginBottom:15}}>Enter Email</Text>
                </View>
                <TextInput placeholder="Enter email here" value={email} onChangeText={(text) => setEmail(text)} style={{height:TNHEIGHT,backgroundColor:TNCOLOR,width:'80%',alignSelf:'center',borderRadius:15,paddingHorizontal:15}} />
                <Button title="Submit" onPress={Checkemail} />
            </View>
        </SafeAreaView>
    )
}