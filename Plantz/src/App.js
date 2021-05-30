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
import PlantDetails from "./screens/PlantDetails";
import {enableScreens} from "react-native-screens";

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
                <Stack.Screen
                    name={'PlantDetails'}
                    component={PlantDetails}

                    sharedElementsConfig={(route, otherRoute, showing) => {
                        if (otherRoute.name === 'Main' && showing) {
                            return [
                                {id: route.params.image},
                                {id: 'back', animation: 'fade-in'},
                                {id: 'enlarge', animation: 'fade-in'},
                                {id: 'overlay', animation: 'fade-in'},
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
                />
                <Stack.Screen name='Camera' component={Camera}/>
                <Stack.Screen name={'AddPlant'} component={AddPlant}/>
                <Stack.Screen
                    name={'ImageView'}
                    component={ImageView}
                    sharedElementsConfig={(route, otherRoute, showing) => {
                        return [route.params.uri];
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
                    })}/>
            </Stack.Navigator>
        </NavigationContainer>
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
