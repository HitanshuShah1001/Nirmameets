import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { View, Text, Button } from "react-native";
import { useSelector } from "react-redux";

export default function Questions() {
  const user = useSelector((state) => state.user);
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
        setQuestions(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setAnswers(answers)
    console.log(answers,'Here');
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
                  <Button title="See answers" onPress={() => getAnswer(question._id)} />
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
