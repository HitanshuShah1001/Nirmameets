import React,{useState,useEffect} from "react";
import {View,Text,TextInput, SafeAreaView,Alert} from 'react-native';
import { Button } from "react-native-paper";
import { TNHEIGHT,TNCOLOR,TEXTCOLOR } from "../../Utilities/auth";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function OTP(props) {

    const [otp,setOtp] = useState('');
    // useEffect(() => {
    //   console.log(props.route.params.params.email);
    
      
    // }, [])
    
    const navigation = useNavigation();
    const VerifyOTP = () => {
        console.log('In here');
        axios.post('http://localhost:443/verifyotp',{
        email:props.route.params.params.email,
        otpcode:otp
    }).then(res => {
        console.log(res,'ress');
        navigation.navigate("Forgotpassword",{email:props.route.params.params.email})
        // navigation.navigate("OTP",{params:{email}})
    }).catch(error => {
        console.log(error);
        
    })
    }



    return (
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <View style={{flex:1}}>
                <TextInput placeholder="Enter otp here" value={otp} onChangeText={(text) => setOtp(text)}  style={{height:TNHEIGHT,backgroundColor:TNCOLOR,width:'80%',alignSelf:'center',borderRadius:15,paddingHorizontal:15,color:TEXTCOLOR,marginTop:30}} />
                <Button mode="contained" style={{width:100,alignSelf:'center',marginTop:40}} onPress={VerifyOTP}>Verify</Button>
            </View>
        </SafeAreaView>
    )
}