import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Login from '../Screens/Auth/Login';
import Home from '../Screens/AfterAuth/Home';
import SignUp from '../Screens/Auth/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { getUser } from '../Redux/Action/Actions';
import { useDispatch, useSelector } from 'react-redux';
import Settings from '../Screens/AfterAuth/Settings';
import User from '../Screens/AfterAuth/User';
import Addquestion from '../Screens/AfterAuth/Addquestion';
import CameraScreen from '../Screens/Auth/CameraScreen';
import Fields from '../Screens/AfterAuth/Fields';
import Forgotpassword from '../Screens/Auth/Forgotpassword';
import CheckEmail from '../Screens/Auth/CheckEmail';
import OTP from '../Screens/Auth/OTP';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const BottomTabs = () => {
    return (
        <Tab.Navigator initialRouteName='Feed' shifting={true} keyboardHidesNavigationBar={false} sceneAnimationEnabled>
            <Tab.Screen name="Feed" component={Home} />
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
                    <Stack.Screen name="Addquestion" component={Addquestion}  />
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
                    <Stack.Screen name="CameraScreen" component={CameraScreen} options={{headerShown:false}} />
                    <Stack.Screen name="Fields" component={Fields}  />
                    <Stack.Screen name="CheckEmail" component={CheckEmail}  />
                    <Stack.Screen name="OTP" component={OTP} />
                    <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigation;
