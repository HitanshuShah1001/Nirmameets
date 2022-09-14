import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppContext } from "../Context/Context";
import { logoutUser } from "../Redux/Action/Actions";
import { useNavigation } from "@react-navigation/native";
import Answer from "./Answers";

const RenderQuestions = ({ question, answers, toRefresh }) => {
  const navigation = useNavigation();
  const { setRefreshquestions, refreshQuestions } =
    React.useContext(AppContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [answer, setAnswer] = useState("Enter answer here");
  const [showanswers, setShowanswers] = useState(false);
  const [addcommentmodalvisible, setAddcommentmodalvisible] = useState(false);
  const [tnheight, setTnheight] = useState(0);

  const postanswer = () => {
    console.log('Here in post')
    toRefresh(false);
    axios
      .post(`http://localhost:443/addanswer/${question._id}`, {
        token: user.token,
        answer: answer,
        Username: user.Username,
      })
      .then((res) => {
        toRefresh(Date.now());
        Alert.alert(res.data.message);
        setAddcommentmodalvisible(false)
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          dispatch(logoutUser());
        } else {
          console.log(error.response);
          Alert.alert(error.message);
        }
      });
  };
  
  const deletequestion = (qid) => {
    axios.post(`http://localhost:443/deletequestion/${qid}`,{
      token:user.token
    }).then(res => {
      Alert.alert(res.data.message);
      toRefresh(Date.now());
    }).catch(error => {
      console.log(error);
    })
  }


  const getAnswers = () => {
    setShowanswers(!showanswers);
  };

  const Answers = answers?.map((answer,index) => 
    <Answer answer={answer} key={index} question={question} toRefresh={toRefresh}/>)

  return (
    <View key={question._id} style={{ marginTop: 30, alignItems: "center" }}>
      <Modal visible={addcommentmodalvisible} animationType="slide">
        <View style={{ flex: 1, marginTop: 50 }}>
          <Pressable onPress={() => setAddcommentmodalvisible(false)}>
            <Text>Go Back</Text>
          </Pressable>
          <ScrollView >
          {answers?.map((answer, index) => (
            
            <View
              key={index}
              style={{
                marginTop: 30,
                justifyContent: "center",
                alignItems: "flex-start",
                paddingHorizontal: 20,
              }}
            >
              <Text>{Object.getOwnPropertyNames(answer)[0]}</Text>
              <Text>{Object.values(answer)[0]}</Text>
            </View>
            
          ))}
          </ScrollView>
          </View>
          <View style={{ flex:0.2, width: "100%",backgroundColor:'black',justifyContent:'space-around' }}>
            <TextInput
              style={{
               
                height: Math.max(50, tnheight),
                borderRadius: 10,
                width: "90%",
                alignSelf: "center",
                backgroundColor: "grey",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              multiline={true}
              onContentSizeChange={(event) => {
                setTnheight(event.nativeEvent.contentSize.height);
                console.log(tnheight);
              }}
              placeholder="Enter answer here"
              value={answer}
              onChangeText={(text) => setAnswer(text)}
            />
            <Button
              title="Post"
              
              onPress={() => postanswer()}
            />
          </View>
        
      </Modal>
      <Text>{question.question}</Text>
      <Text>{question.Username}</Text>
     {
     (user.Username === question.Username) && (
      <Pressable onPress={() => deletequestion(question._id)}>
        <Text>Delete Question</Text>
      </Pressable>
     )} 
      <Text>Answers received :- {answers.length}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button title="Get answer" onPress={() => getAnswers()} />
        <Button
          title="Add answer"
          onPress={() => setAddcommentmodalvisible(true)}
        />
      </View>
      {showanswers && (
        <ScrollView>
          {Answers}
        </ScrollView>
      )}
    </View>
  );
};

export default RenderQuestions;
