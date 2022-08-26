import React,{useEffect, useState} from "react";
import { SafeAreaView,View,Text, Alert } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { AppContext } from "../../Context/Context";


export default function User(){
    const { refreshQuestions} = React.useContext(AppContext);
    const user = useSelector((state) => state.user);
    const [totalQuestion,setTotalQuestions] = useState();
    const [totalAnswers,setTotalanswers] = useState();


    useEffect(() => {
        axios.post('http://localhost:443/gettotalquestionsasked',{
            token:user.token,
            Username:user.Username
        }).then(res => {
            setTotalQuestions(res.data.message);
        }).catch(error => {
            Alert.alert('Some error occured!');
        })
    },[refreshQuestions])

    useEffect(() => {
        axios.post('http://localhost:443/gettotalanswers',{
            token:user.token,
            Username:user.Username
        }).then(res => {
            setTotalanswers(res.data.message);
        }).catch(error => {
            Alert.alert('Some error occured');
        })
    },[])


    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <View style={{flex:2,paddingHorizontal:15,justifyContent:'space-around',alignItems:'center',marginTop:40}}>
                    <Text>{user.Name}</Text>
                    <Text>{user.Username}</Text>
                    <Text>{user.Field}</Text>
                    <Text>{user.email}</Text>
                    <Text>{user.Field}</Text>
                    <Text>Questions asked :- {totalQuestion}</Text>
                    <Text>Answers given : - {totalAnswers}</Text>
                   
                </View>
                <View style={{flex:6}}>

                </View>
                
            </View>
        </SafeAreaView>
    )
}