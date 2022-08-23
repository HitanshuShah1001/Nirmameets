import React,{useState} from "react";
import {View,SafeAreaView,Button,TextInput, Alert} from 'react-native';
import { useDispatch,useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../Context/Context";
import axios from "axios";

export default function Addquestion(){
    const navigation = useNavigation();
    const { refreshQuestions,setRefreshquestions } = React.useContext(AppContext);
    const [question,setQuestion] = useState("");

    const user = useSelector((state) => state.user)
    
    const dispatch = useDispatch();

    const addquestion = () => {
        axios.post('http://localhost:443/question',{
            question:question,
            Username:user.Username,
            Field:user.Field,
            token:user.token
        }).then(res => {
            if(res.data.message == 'Question posted succesfully'){
                Alert.alert(res.data.message);
                setRefreshquestions(!refreshQuestions);
                navigation.navigate('Feed')
            };
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'black'}}>
            <View style={{flex:1}}>
               <TextInput placeholder="Question" value={question} onChangeText={(text) => setQuestion(text)} style={{borderRadius:20,height:50,paddingHorizontal:10,backgroundColor:'white',marginTop:30}} />
               <Button title="Add question" onPress={addquestion} />
             </View>
        </SafeAreaView>
    )
}