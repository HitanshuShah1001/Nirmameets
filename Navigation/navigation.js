import React,{useState,useEffect} from 'react';
import { createMaterialBottomTabNavigator, MaterialBottomTabView } from '@react-navigation/material-bottom-tabs';
import Login from '../Screens/Auth/Login';
import Home from '../Screens/AfterAuth/Home';
import SignUp from '../Screens/Auth/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from '../Redux/Action/Actions';
import { useDispatch, useSelector } from 'react-redux';
import Settings from '../Screens/AfterAuth/Settings';
import User from '../Screens/AfterAuth/User';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const BottomTabs = () => {
    return (
        <Tab.Navigator initialRouteName='Home' shifting={true} keyboardHidesNavigationBar={false} sceneAnimationEnabled>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="User" component={User} />
            <Tab.Screen name="Settings" component={Settings} />

        </Tab.Navigator>
    )
}

const Navigation = () => {
    const dispatch = useDispatch();
    dispatch(getUser());
    const user = useSelector((state) => state.user);
    if(user.Name!=='' && user.isAuthenticated){
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Main page" 
                        component={BottomTabs} options={{headerShown:false}} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    else{
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
                    <Stack.Screen name="SignUp" component={SignUp}  options={{headerShown:false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigation;
