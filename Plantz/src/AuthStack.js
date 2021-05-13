import React from 'react';
import Login from "./screens/login";
import Main from "./screens/Main";
import {createStackNavigator} from '@react-navigation/stack';

function AuthStack(props) {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    );
}

export default AuthStack;
