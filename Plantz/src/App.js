import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/login';
import Main from './screens/Main';
import { useRetrieveSession } from './hooks/EncryptedStorage.hook';
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import Camera from "./screens/Camera";

export const App = () => {
    console.log('rerender app');
    const Stack = createStackNavigator();
    const [user, setUser] = useState(null);

    useEffect(() => {
        useRetrieveSession().then((session) => {
            setUser(session);
        })
    }, [])

    return (
        <NavigationContainer>
            {/*{user ?*/}
            {/*    <AppStack />*/}
            {/*    :*/}
            {/*    <AuthStack />*/}
            {/*}*/}

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name='Main' component={Main}/>
                <Stack.Screen name='Camera' component={Camera} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
