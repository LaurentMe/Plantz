import React, {useState} from 'react';
import {Image, Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons'

function Login(props) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const axios = require('axios').default;

    const login = () => {
        axios.post('http://localhost:8080/login', {
            email: username,
            password: password,
            device_name: 'mobile',
        })
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function storeUserSession(res) {
        try {
            await EncryptedStorage.setItem(
                'user_session',
                JSON.stringify({
                    token: res.token,
                    username: username.toLowerCase(),
                }),
            );
            navigation.replace('Main');

            // Congrats! You've just stored your first value!
        } catch (error) {
            // There was an error on the native side
        }
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo/logoPlantz.png')}
            />
            <View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={(text) => setUsername(text)}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <FontAwesomeIcon icon={faUser} color={'#26A66B'}/>
                </View>
            </View>
            <View>
                <Text style={styles.label}>Wachtwoord</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={(text) => setPassword(text)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                    <FontAwesomeIcon icon={faLock} color={'#26A66B'}/>
                </View>
            </View>
            <TouchableOpacity onPress={login}>
                <View style={styles.loginButton}>
                    <Text style={styles.loginText}>Login</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    logo: {
        width: 300,
        height: 300,
        top: -50,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: 2,
        borderBottomWidth: 1,
        borderColor: '#C9C9C9',
        marginBottom: 20
    },
    inputField: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        width: 250,
        fontSize: 15,
    },
    label: {
        fontFamily: 'Roboto',
        fontSize: 13,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#26A66B',
        width: 250,
        height: 45,
        justifyContent: 'center',
    },
    loginText: {
        color: '#fff',
        alignSelf: 'center',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    }
});
