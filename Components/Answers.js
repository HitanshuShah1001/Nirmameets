import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { logoutUser } from "../Redux/Action/Actions";
import axios from "axios";
export default function Answer({ answer, index, question,toRefresh }) {

  const [votes,setVotes] = useState(answer?.Votes);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const addupvote = (id, Username) => {
    console.log("Here in up",id,Username,question._id,user.token);
    if (user.Username === Username) {
      Alert.alert("You cannot upvote your own answer");
    } else {
      setVotes(votes+1);
      axios
        .post(`http://localhost:443/addupvote/${question._id}`, {
          token: user.token,
          id: id,
        })
        .then((res) => {
          console.log(res);
          toRefresh(Date.now());
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.status === 401) {
            dispatch(logoutUser());
          } else {
            console.log(error.response);
          }
        });
    }
  };

  const adddownvote = (id, Username) => {
    console.log("Here in down");
    if (user.Username === Username) {
      Alert.alert("You cannot downvote your own answer");
    } else {
        setVotes(votes-1);  
      axios
        .post(`http://localhost:443/adddownvote/${question._id}`, {
          token: user.token,
          id: id,
        })
        .then((res) => {
          toRefresh(Date.now());
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            dispatch(logoutUser());
          } else {
            console.log(error.response);
          }
        });
    }
  };

  const deleteanswer = (qid, answerid) => {
    axios
      .post(`http://localhost:443/deleteanswer/${qid}`, {
        id: answerid,
        token: user.token,
      })
      .then((res) => {
        Alert.alert(res.data.message);
        toRefresh(Date.now());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
      <Pressable
        onPress={() => {
          addupvote(answer.id, Object.values(answer)[0]);
        }}
      >
        <Text>Upvote</Text>
      </Pressable>
      <Text>{votes}</Text>
      <Pressable
        onPress={() => {
          adddownvote(answer.id, Object.values(answer)[0]);
        }}
      >
        <Text>Downvote</Text>
      </Pressable>
      {(Object.values(answer)[0] === user.Username ||
        question.Username === user.Username) && (
        <Pressable onPress={() => deleteanswer(question._id, answer.id)}>
          <Text>Delete</Text>
        </Pressable>
      )}
    </View>
  );
}
