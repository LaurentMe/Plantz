import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlusCircle, faUser} from "@fortawesome/free-solid-svg-icons";
import {useStoreSession} from "../hooks/EncryptedStorage.hook";
import axios from "axios";
import { useRetrieveSession} from "../hooks/EncryptedStorage.hook";

function AddPlant({navigation, route}) {
    const [name, setName] = useState();
    const [latinName, setLatinName] = useState();
    const [nickname, setNickname] = useState();
    const [water, setWater] = useState();
    const [waterDays, setWaterDays] = useState();
    const [location, setLocation] = useState();

    useEffect(() => {
        setLatinName(route.params.plantLatin)
    }, [])

    const addPlant = () => {
        useRetrieveSession().then((session) => {
            axios.post('http://192.168.1.110/api/plants', {
                name: name,
                latinName: latinName,
                nickname: nickname,
                water: water,
                waterDays: waterDays,
                location: location,
                image: route.params.image
            }, {
                headers: {
                    Authorization: "Bearer " + session.token,
                }
            })
                .then(function (response) {
                    console.log(response.data)
                    if(response.status === 201) {
                        navigation.popToTop();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }


    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.secondContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Add plant</Text>
                        <TouchableOpacity onPress={addPlant}>
                            <FontAwesomeIcon icon={faPlusCircle} size={30} color={'#1F6F4A'} style={{top: 4, marginRight: 4}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: 1000,
                            marginTop: 16,
                            marginBottom: 20
                        }}
                        source={{uri: 'data:image/png;base64,' + route.params.image}}
                    />
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={(text) => setName(text)}
                            autoCorrect={false}

                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Latin name</Text>
                        <TextInput
                            style={styles.inputField}
                            value={route.params.plantLatin}
                            onChangeText={(text) => setLatinName(text)}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nickname</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={(text) => setNickname(text)}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Water</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={(text) => setWater(text)}
                            keyboardType={"number-pad"}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Waterdays</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={(text) => setWaterDays(text)}
                            keyboardType={"number-pad"}
                            autoCapitalize='none'
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            style={styles.inputField}
                            onChangeText={(text) => setLocation(text)}
                            autoCorrect={false}
                        />
                    </View>

                </View>
                <TouchableOpacity style={{alignItems: 'center', marginBottom: 20}} onPress={addPlant}>
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
        justifyContent: 'space-between',
        alignItems: 'center',
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
