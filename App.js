import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/Auth/Login';
import Navigation from './Navigation/navigation';
import { createStore,applyMiddleware,compose } from "redux";
import {  Provider } from 'react-redux';
import thunk from 'redux-thunk';
import NMReducer from './Redux/Reducer/reducer';
import { AppContext } from './Context/Context';
import { useState } from 'react';

export default function App() {
  const middleware = [thunk];
  const store = createStore(NMReducer,compose(applyMiddleware(...middleware)))
  const [refreshQuestions,setRefreshquestions] = useState(false);
  const values = {refreshQuestions,setRefreshquestions}
  return (
    <Provider store={store}>
      <AppContext.Provider value={values} >
      <Navigation />
      </AppContext.Provider>
      </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
