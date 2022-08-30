import React,{useEffect, useState} from "react";
import {SafeAreaView,View,Text,Pressable} from 'react-native';
import { Searchbar } from "react-native-paper";
import { FIELDS } from "../../Fields/fields";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function Fields() {
    const navigation = useNavigation();
    const [fieldsearch,setFieldsearch] = useState("");
    const [fields,setFields] = useState(FIELDS);

    // useEffect(() => {
    //     Filterfields(fieldsearch);
    
    // },[fieldse
    useEffect(() => {
        Filterfields(fieldsearch);
    },[fieldsearch])

    const Filterfields = (text) => {
        setFieldsearch(text);
        setFields(FIELDS.filter(field => field.toLowerCase().includes(fieldsearch.toLowerCase())))
    }
    
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <Searchbar style={{marginHorizontal:10,marginVertical:10,borderRadius:20}} onChangeText={(text) => setFieldsearch(text)} value={fieldsearch}/>
                <ScrollView>
                {fields?.map((field,index) => (
                    <Pressable key={index} onPress={() => navigation.navigate('SignUp',{params:{field:field}})}>
                    <Text key={index} style={{paddingHorizontal:20,paddingVertical:5}}>{field}</Text>
                    </Pressable>
                ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}