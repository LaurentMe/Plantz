import React from 'react';
import {Text, View, Button} from "react-native";
import {useLogout} from "../hooks/EncryptedStorage.hook";

function Main({navigation}) {

    const logout = () => {
        useLogout().then(() => {
            navigation.replace('Login')
        });
    }

    return (
        <View>
            <Button title={'Logout'} onPress={logout}/>
        </View>
    );
}

export default Main;
