import React from 'react';
import {Image, Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

function Login(props) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo/logoPlantz.png')}
            />
            <View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputField}>
                    </TextInput>
                    <FontAwesomeIcon icon={faUser} color={'#26A66B'}/>
                </View>
            </View>
            <View>
                <Text style={styles.label}>Wachtwoord</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputField}>
                    </TextInput>
                    <FontAwesomeIcon icon={faLock} color={'#26A66B'}/>
                </View>
            </View>
            <TouchableOpacity>
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
        paddingVertical: 4,
        paddingHorizontal: 10,

        backgroundColor: 'white',
        width: 250,
    },
    label: {
        fontFamily: 'Roboto',
        fontSize: 13,
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
        fontFamily: 'Roboto-Regular'
    }
});