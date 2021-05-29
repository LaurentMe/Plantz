import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/login';
import Main from './screens/Main';
import {useRetrieveSession} from './hooks/EncryptedStorage.hook';
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import Camera from "./screens/Camera";
import AddPlant from "./screens/AddPlant";
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ImageView from "./screens/ImageView";

export const App = () => {
    console.log('rerender app');
    const Stack = createSharedElementStackNavigator();
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
                <Stack.Screen name='Camera' component={Camera}/>
                <Stack.Screen name={'AddPlant'} component={AddPlant}/>
                <Stack.Screen
                    name={'ImageView'}
                    component={ImageView}
                    options={() => ({
                        gestureEnabled: false,

                        cardStyleInterpolator: ({current: {progress}}) => {
                            return {
                                cardStyle: {
                                    opacity: progress,
                                }
                            }
                        }
                    })}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
