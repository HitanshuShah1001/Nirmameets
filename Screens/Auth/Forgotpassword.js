import React,{useState} from "react";
import {View,Text,TextInput, SafeAreaView} from 'react-native';
import { TNHEIGHT,TNCOLOR } from "../../Utilities/auth";

export default function Forgotpassword() {

    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmpassword] = useState('');
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <TextInput placeholder="Enter password " value={password} onChangeText={(text) => setPassword(text)} style={{height:TNHEIGHT,backgroundColor:TNCOLOR}} />
                <TextInput placeholder="Confirm password" value={confirmpassword} onChangeText={(text) => setConfirmpassword(text)} style={{height:TNHEIGHT,backgroundColor:TNCOLOR}} />
            </View>
        </SafeAreaView>
    )
}