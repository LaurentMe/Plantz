import React from 'react';
import Login from "./screens/login";
import Main from "./screens/Main";
import {createStackNavigator} from '@react-navigation/stack';

function AppStack({user, setUser}) {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Main" component={Main}/>
        </Stack.Navigator>
    );
}

export default AppStack;
