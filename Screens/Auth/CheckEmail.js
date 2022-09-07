import React,{useState} from "react";
import {View,Text,TextInput, SafeAreaView, Alert,Button} from 'react-native';
import { TNHEIGHT,TNCOLOR,TEXTCOLOR } from "../../Utilities/auth";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
export default function CheckEmail() {
    const navigation = useNavigation();
    const Checkemail = () => {
        console.log('In here');
        axios.post('http://localhost:443/sendemail',{
        email:email
    }).then(res => {
        Alert.alert(res.data.message);
        navigation.navigate("OTP",{params:{email}})
    }).catch(error => {
        
        Alert.alert(error.response.data);
    })
    }
    

    const [email,setEmail] = useState('')
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <View style={{flex:1}}>
                <View style={{alignSelf:'center',width:'80%'}}>
                    <Text style={{fontWeight:'700',color:'white',fontSize:30,marginBottom:15}}>Enter Email</Text>
                </View>
                <TextInput placeholder="Enter email here" value={email} onChangeText={(text) => setEmail(text)} style={{height:TNHEIGHT,backgroundColor:TNCOLOR,width:'80%',alignSelf:'center',borderRadius:15,paddingHorizontal:15,color:TEXTCOLOR}} />
                <Button title="Submit" onPress={Checkemail} />
            </View>
        </SafeAreaView>
    )
}