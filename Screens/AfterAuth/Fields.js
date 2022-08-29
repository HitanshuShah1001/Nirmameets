import React,{useState} from "react";
import {SafeAreaView,View,Text} from 'react-native';
import { FIELDS } from "../../Fields/fields";

export default function Fields() {
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                {FIELDS.map((field,index) => (
                    <Text key={index} style={{paddingHorizontal:20,paddingVertical:5}}>{field}</Text>
                ))}
            </View>
        </SafeAreaView>
    )
}