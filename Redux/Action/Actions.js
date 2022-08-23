// kinda database
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { React, useState } from "react";
import { SET_USER,LOGOUT_USER } from "./Actiontypes";

const initialState = {
  user: {
    Name:'',
    email:'',
    Field:'',
    token:'',
    Username:'',
    isAuthenticated:false
  },
};

export const setUser =
  (Name, email, token, Field,Username,auth) => async (dispatch) => {
    let user = {
      Name: Name,
      email: email,
      token: token,
      Field: Field,
      Username:Username,
      isAuthenticated:auth
    };

    try {
      let checkSecureStorage = await SecureStore.isAvailableAsync();

      if (checkSecureStorage) {
        await SecureStore.setItemAsync(
          "user",
          JSON.stringify(user)
        );
      }

      dispatch({
        type: SET_USER,
        payload: { user: user },
      });
    } catch (error) {
      dispatch({
        type: SET_USER,
        payload: { user: initialState.user },
      });
    }
  };

export const getUser = () => async (dispatch) => {
  let getuser = await SecureStore.getItemAsync("user");

  var user = JSON.parse(getuser);

  if (user !== null) {
    dispatch({
      type: SET_USER,
      payload: { user: user },
    });
  } else {
    user = initialState;
    dispatch({
      type: SET_USER,
      payload: { user: user },
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  let checkSecureStorage = await SecureStore.isAvailableAsync();
  if (checkSecureStorage) {
    await SecureStore.deleteItemAsync("user");
    
    dispatch({
      type: LOGOUT_USER,
    });
  }
};

