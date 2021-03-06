import React, {useState, useEffect} from 'react';
import {Image, Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons'
import { useStoreSession, useRetrieveSession } from '../hooks/EncryptedStorage.hook';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../hooks/AuthContext";
import {err} from "react-native-svg/lib/typescript/xml";

function Login({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();
    const axios = require('axios').default;

    const { signIn } = React.useContext(AuthContext);

    const login = (data) => {
        signIn(data, setErrors)
    }
    const register = () => {
        navigation.navigate('Register');
    }

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo/logoPlantz.png')}
            />
            <View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.inputField]}
                        onChangeText={(text) => setUsername(text)}
                        autoCapitalize='none'
                        keyboardType={"email-address"}
                        autoCorrect={false}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    />
                    <FontAwesomeIcon icon={faUser} color={'#26A66B'}/>
                </View>
            </View>
            <View>
                <Text style={styles.label}>Password</Text>
                <View style={[styles.inputContainer, {marginBottom: 0}]}>
                    <TextInput
                        style={[styles.inputField, {fontSize: 12}]}
                        onChangeText={(text) => setPassword(text)}
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType={"email-address"}
                        secureTextEntry={true}
                        ref={(input) => { this.secondTextInput = input; }}
                        onSubmitEditing={() => signIn({ username, password })}
                    />
                    <FontAwesomeIcon icon={faLock} color={'#26A66B'}/>
                </View>
            </View>
            <View style={styles.errorContainer}>
                {errors && Object.keys(errors).map(function (key, index){
                    return (
                        <Text key={key} style={styles.errorsText}>{errors[key]}</Text>
                    )
                })}
            </View>
            <TouchableOpacity onPress={() => login({ username, password })}>
                <View style={styles.loginButton}>
                    <Text style={styles.loginText}>Login</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => register()}>
                <View style={styles.registerButton}>
                    <Text style={styles.registerText}>Sign up</Text>
                </View>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
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
        top: -40,
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
        fontFamily: 'Circular Std'
    },
    label: {
        fontFamily: 'Circular Std',
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
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
    },
    registerButton: {
        marginTop: 10,
        backgroundColor: '#fff',
        width: 250,
        height: 45,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#26A66B',
    },
    registerText: {
        color: '#000',
        alignSelf: 'center',
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
    },
    title: {
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
        fontSize: 40
    },
    errorContainer: {
        width: 260,
        height: 50,
        justifyContent: 'center'
    },
    errorsText: {
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
        color: '#ED1103',
        fontSize: 12,
    }
});
