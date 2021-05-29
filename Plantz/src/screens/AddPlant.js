import React, {useEffect, useState} from 'react';
import {
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Dimensions
} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faPlusCircle, faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons";
import {useStoreSession} from "../hooks/EncryptedStorage.hook";
import axios from "axios";
import { useRetrieveSession} from "../hooks/EncryptedStorage.hook";

function AddPlant({navigation, route}) {
    const [name, setName] = useState('');
    const [latinName, setLatinName] = useState('');
    const [nickname, setNickname] = useState('');
    const [water, setWater] = useState('');
    const [waterDays, setWaterDays] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        setLatinName(route.params.plantLatin);
        if (route.params.plant !== null){
            setName(route.params.plant.name);
            setWater(route.params.plant.water_amount);
            setWaterDays(route.params.plant.days_between_water);
        }
    }, [])

    const goBack = () => {
        navigation.goBack();
    }

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
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <TouchableOpacity style={{zIndex: 10}} onPress={goBack}>
                        <View style={styles.backButton}>
                            <FontAwesomeIcon icon={faArrowLeft} color={'#000'} size={18}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.expandButton}>
                        <FontAwesomeIcon icon={faExpandArrowsAlt} color={'#fff'} size={18}/>
                    </View>
                    <Image
                        style={{
                            width: Dimensions.get('window').width,
                            height: 400,
                        }}
                        source={{uri: 'data:image/png;base64,' + route.params.image}}
                    />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>New plant</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nickname</Text>
                        <TextInput
                            style={styles.inputField}
                            value={nickname}
                            onChangeText={(text) => setNickname(text)}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Plant name</Text>
                        <TextInput
                            style={styles.inputField}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            autoCorrect={false}

                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Latin name</Text>
                        <TextInput
                            style={styles.inputField}
                            value={latinName}
                            onChangeText={(text) => setLatinName(text)}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Water dosis</Text>
                        <TextInput
                            style={styles.inputField}
                            value={water.toString()}
                            onChangeText={(text) => setWater(text)}
                            keyboardType={"number-pad"}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Waterdays</Text>
                        <TextInput
                            style={styles.inputField}
                            value={waterDays.toString()}
                            onChangeText={(text) => setWaterDays(text)}
                            keyboardType={"number-pad"}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            style={styles.inputField}
                            value={location}
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
        </View>
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
        marginBottom: 20,
        fontSize: 28,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#1F6F4A'
    },
    formContainer: {
        marginHorizontal: 35,
        paddingBottom: 10,
        marginTop: 15,
    },
    label: {
        fontFamily: 'Circular Std',
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
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 30,
        color: '#fff',
        backgroundColor: '#fff',
        zIndex: 20,
        borderRadius: 200,
        padding: 12,
        opacity: 0.9,
    },
    expandButton: {
        position: 'absolute',
        bottom: 20,
        right: 30,
        zIndex: 40,
        opacity: 0.9,
    },
})
