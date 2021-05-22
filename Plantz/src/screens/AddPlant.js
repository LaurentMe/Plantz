import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlusCircle, faUser} from "@fortawesome/free-solid-svg-icons";

function AddPlant({navigation, route}) {

    const addPlant = () => {
        navigation.popToTop()

    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.secondContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Add plant</Text>
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={{
                            width: 280,
                            height: 400,
                            borderRadius: 6,
                            marginTop: 16
                        }}
                        source={{uri: 'data:image/png;base64,' + route.params.image}}
                    />
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.inputField}
                            // onChangeText={(text) => setUsername(text)}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Latin name</Text>
                        <TextInput
                            style={styles.inputField}
                            // onChangeText={(text) => setUsername(text)}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Date added</Text>
                        <TextInput
                            style={styles.inputField}
                            // onChangeText={(text) => setUsername(text)}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Water</Text>
                        <TextInput
                            style={styles.inputField}
                            // onChangeText={(text) => setUsername(text)}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            style={styles.inputField}
                            // onChangeText={(text) => setUsername(text)}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>

                </View>
                <TouchableOpacity style={{alignItems: 'center', marginTop: 20}} onPress={addPlant}>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginText}>Add plant</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddPlant;

const styles = StyleSheet.create({
    secondContainer: {
        marginHorizontal: 35,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#bbb',
    },
    titleContainer: {
        flexDirection: 'row',
    },
    title: {
        marginTop: 10,
        fontSize: 28,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#1F6F4A'
    },
    formContainer: {
        marginHorizontal: 35,
        paddingBottom: 10,
        marginTop: 20,
    },
    label: {
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 30,
    },
    inputField: {
        padding: 10,
        fontSize: 15,
        marginHorizontal: 2,
        borderBottomWidth: 1,
        borderColor: '#26A66B'
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
})
