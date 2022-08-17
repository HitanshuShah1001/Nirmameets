import React from "react";
import {View,Text,StyleSheet, SafeAreaView,Button} from 'react-native';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Action/Actions";


export default function Home(){
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                 <Button title="Logout"  onPress={() => dispatch(logoutUser())}/> 
            </View>
        </SafeAreaView>
    )
}