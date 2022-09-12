import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RenderQuestions from "./Renderquestions";
import { logoutUser } from "../Redux/Action/Actions";
import { ActivityIndicator } from "react-native-paper";

export default function Questions() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [questions,setQuestions] = useState([]);
  const [refresh,setRefresh] = useState(10);
  const [showIndicator,setShowindicator] = useState(false);

  const toRefresh = (refresh) => {
    console.log('I am called!');
    setRefresh(refresh);
}

  useEffect(() => {
    setShowindicator(true);
    console.log('I am being called!');
    axios.post("http://localhost:443/getquestion", {
        Field: user.Field,
        token: user.token,
      })
      .then((res) => {
        setShowindicator(false)
        setQuestions(res.data.message)
      })
      .catch((error) => {
        console.log(error);
        setShowindicator(false);
        if (error.response.status === 401) {
          dispatch(logoutUser());
        }
      });
  }, [refresh]);



  const Questions = questions.map((question) => 
  <RenderQuestions question={question} key={question._id} answers={question.Answers} toRefresh={toRefresh}/>
  )

  return (

    <ScrollView showsVerticalScrollIndicator>
      {showIndicator && (
        <ActivityIndicator size={"small"} />
      )}
      {/* {!showIndicator && (
        questions.map((question) => <RenderQuestions question={question} key={question._id} answers={question.Answers} toRefresh={toRefresh}/>)
      )} */}
      <Text style={{ fontSize: 40, marginHorizontal: 20 }}>Questions</Text>
      {Questions}
    </ScrollView>
  );
}
