import React from "react";
import {View,Text,StyleSheet, SafeAreaView,Button} from 'react-native';
import { useDispatch,useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Action/Actions";
import { useNavigation } from "@react-navigation/native";
import Questions from "../../Components/Questions";
export default function Home(){
    const user = useSelector((state) => state.user)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <Text style={{justifyContent:'center',alignItems:'center',fontSize:35,fontWeight:'600'}}>{user.Field}</Text>
                    <Button title="Ask "  onPress={() => navigation.navigate('Addquestion')}/> 
                </View>
                 
                 <Button title="Logout "  onPress={() => dispatch(logoutUser())}/> 
                 <Questions />
            </View>
        </SafeAreaView>
    )
}