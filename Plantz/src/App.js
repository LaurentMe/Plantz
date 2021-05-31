import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/login';
import Main from './screens/Main';
import {useLogout, useRetrieveSession, useStoreSession} from './hooks/EncryptedStorage.hook';
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import Camera from "./screens/Camera";
import AddPlant from "./screens/AddPlant";
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ImageView from "./screens/ImageView";
import PlantDetails from "./screens/PlantDetails";
import {enableScreens} from "react-native-screens";
import SplashScreen from "./screens/SplashScreen";

import { AuthContext } from "./hooks/AuthContext";
import axios from "axios";

export const App = () => {
    const Stack = createSharedElementStackNavigator();
    const axios = require('axios').default;


    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                useRetrieveSession().then((res) => {
                    userToken = res;
                    dispatch({ type: 'RESTORE_TOKEN', token: userToken });
                }).catch((error) => {
                    console.log(error)
                })
            } catch (e) {
            }
        };
        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                axios.post('http://192.168.1.110/login', {
                    email: data.username,
                    password: data.password,
                    device_name: 'mobile',
                })
                    .then(function (response) {
                        if (response.status == 200){
                            useStoreSession(response.data.token).then(() => {
                                dispatch({ type: 'SIGN_IN', token: response.data });
                            }).catch(function (error) {
                                console.log(error);
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            signOut: () => {
                useLogout();
                dispatch({ type: 'SIGN_OUT' })
            },
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    {state.isLoading ? (
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) : state.userToken == null ? (
                        <Stack.Screen name="Login" component={Login} options={{
                            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                        }}/>
                    ) : (
                        <>
                            <Stack.Screen name='Main' component={Main}/>
                            <Stack.Screen
                                name={'PlantDetails'}
                                component={PlantDetails}

                                sharedElementsConfig={(route, otherRoute, showing) => {
                                    if (otherRoute.name === 'Main' && showing) {
                                        return [
                                            {id: route.params.plant.created_at.toString()},
                                            {id: 'back', animation: 'fade-in'},
                                            {id: 'enlarge', animation: 'fade-in'},
                                            {id: 'overlay', animation: 'fade-in'},
                                            {id: 'date', animation: 'fade'},
                                            {id: 'water' + route.params.index, animation: 'fade'},
                                            {id: 'waterDays' + route.params.index, animation: 'fade'},
                                            {id: route.params.plant.nickname, animation: 'fade-in'},
                                        ];
                                    }
                                }}
                                options={() => ({
                                    gestureEnabled: true,
                                    // cardStyleInterpolator: ({current: {progress}}) => {
                                    //     return {
                                    //         cardStyle: {
                                    //             opacity: progress,
                                    //         }
                                    //     }
                                    // }
                                })}
                            />
                            <Stack.Screen name='Camera' component={Camera}/>
                            <Stack.Screen name={'AddPlant'} component={AddPlant}/>
                            <Stack.Screen
                                name={'ImageView'}
                                component={ImageView}
                                sharedElementsConfig={(route, otherRoute, showing) => {
                                    if (otherRoute.name === 'AddPlant' && showing) {
                                        return [
                                            {id: route.params.uri},
                                            {id: 'back'}
                                        ];
                                    }
                                }}
                                options={() => ({
                                    gestureEnabled: false,
                                    cardStyleInterpolator: ({current: {progress}}) => {
                                        return {
                                            cardStyle: {
                                                opacity: progress,
                                            }
                                        }
                                    }
                                })}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>

    );
}
export const iosTransitionSpec = {
    animation: "spring",
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 10,
        restSpeedThreshold: 10,
    },
};
export default App;
