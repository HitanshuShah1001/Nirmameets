import React from "react";
import {View,Text,TextInput, SafeAreaView} from 'react-native';
import { TNHEIGHT,TNCOLOR } from "../../Utilities/auth";

export default function Forgotpassword() {

    const [email,setEmail] = useState('')
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <TextInput placeholder="Enter email here" value={email} onChangeText={(text) => setEmail(text)} style={{height:TNHEIGHT,backgroundColor:TNCOLOR}} />
            </View>
        </SafeAreaView>
    )
}