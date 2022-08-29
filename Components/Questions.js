import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppContext } from "../Context/Context";
import RenderQuestions from "./Renderquestions";
import { logoutUser } from "../Redux/Action/Actions";

export default function Questions() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { refreshQuestions } = React.useContext(AppContext);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    console.log('Hereee',user.Field,user.token)
    axios
      .post("http://localhost:443/getquestion", {
        Field: user.Field,
        token: user.token,
      })
      .then((res) => {
        setQuestions(res.data.message);
      })
      .catch((error) => {
        
        if (error.response.status === 401) {
          dispatch(() => logoutUser());
        }
      });
  }, [refreshQuestions]);



  const Questions = questions.map((question) => 
  <RenderQuestions question={question} key={question._id} answers={question.Answers}/>
  )

  return (
    <ScrollView showsVerticalScrollIndicator>
      <Text style={{ fontSize: 40, marginHorizontal: 20 }}>Questions</Text>
      {Questions}
    </ScrollView>
  );
}
