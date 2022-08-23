import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { AppContext } from "../Context/Context";


export default function Questions() {


  const user = useSelector((state) => state.user);
  const { refreshQuestions} = React.useContext(AppContext);
  const [answers,setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [id,setId] = useState('');
  let AnswerObj = [];
  
  useEffect(() => {
    axios
      .post("http://localhost:443/getquestion", {
        Field: user.Field,
        token: user.token,
      })
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshQuestions]);

  useEffect(() => {
    setAnswers(answers)
  },[answers])

  const getAnswer = async(id) => {
    setId(id);
    AnswerObj =  await questions.filter(function(question){
        return question._id == id
    }) 
    setAnswers(AnswerObj[0].Answers);
  }
  

  
  return (
    <>
      <Text style={{ fontSize: 40, marginHorizontal: 20 }}>Questions</Text>
      {questions.map((question) => (
        <View key={question._id}><View
              style={{
                  marginTop: 30,
                  marginHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
              }}
          >
              <View>
                  <Text>{question.question}</Text>
                  <Text>Asked by {question.Username}</Text>
              </View>
              <View>
                <Pressable onPress={() => getAnswer(question._id)}>
                  <Text>Get Answer</Text>
                </Pressable>
                  </View>
          </View>
          {answers!==[] && question._id==id && (
            answers.map((answer,index) => (
                <Text key={index}>{answer}</Text>
            ))
          )}
          </View>
      ))}
    </>
  );
}
