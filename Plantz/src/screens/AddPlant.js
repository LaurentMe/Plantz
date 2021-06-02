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
    Dimensions, TouchableWithoutFeedback
} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faPlusCircle, faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons";
import {useStoreSession} from "../hooks/EncryptedStorage.hook";
import axios from "axios";
import {useRetrieveSession} from "../hooks/EncryptedStorage.hook";
import {SharedElement} from "react-navigation-shared-element";
import LinearGradient from "react-native-linear-gradient";
import BackButton from "../Components/BackButton";
import EditButton from "../Components/EditButton";
import SaveButton from "../Components/SaveButton";


function AddPlant({navigation, route}) {
    const [name, setName] = useState('');
    const [latinName, setLatinName] = useState('');
    const [nickname, setNickname] = useState('');
    const [water, setWater] = useState('');
    const [waterDays, setWaterDays] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setLatinName(route.params.plantLatin);
        if (!route.params.edit) {
            if (route.params.plant !== null) {
                setName(route.params.plant.name);
                setWater(route.params.plant.water_amount);
                setWaterDays(route.params.plant.days_between_water);
                setDescription(route.params.plant.description)
            }
            return
        }
        setName(route.params.plant.plant.name)
        setNickname(route.params.plant.nickname)
        setWater(route.params.plant.custom_water_amount)
        setWaterDays(route.params.plant.custom_water_days)
        setLocation(route.params.plant.location)
        setDescription(route.params.plant.plant.description)
    }, [])

    const back = () => {
        navigation.goBack();
    }

    const enlarge = () => {
        navigation.navigate('ImageView', {
            image: route.params.image,
            uri: route.params.uri
        })
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
                description: description,
                image: route.params.image
            }, {
                headers: {
                    Authorization: "Bearer " + session,
                }
            })
                .then(function (response) {
                    if (response.status === 201) {
                        navigation.popToTop();
                    }
                })
                .catch(function ({response}) {
                    console.log(response.data.errors)
                    setErrors(response.data.errors);
                });
        })
    }

    const savePlant = () => {
        console.log('ok')
    }

    const deletePlant = () => {
        useRetrieveSession().then((session) => {
            axios.delete('http://192.168.1.110/api/plants/' + route.params.plant.id, {
                headers: {
                    Authorization: "Bearer " + session
                }
            })
                .then(function (response) {
                    navigation.popToTop();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <SharedElement id={'back'} style={{zIndex: 4}}>
                        <BackButton navigation={navigation}/>
                    </SharedElement>
                    {route.params.edit &&
                        <SharedElement id={'edit'} style={{zIndex: 4}}>
                            <SaveButton savePlant={savePlant}/>
                        </SharedElement>
                    }
                    <TouchableWithoutFeedback style={{zIndex: 10}} onPress={enlarge}>
                        <View style={styles.expandButton}>
                            <FontAwesomeIcon icon={faExpandArrowsAlt} color={'#fff'} size={18}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={styles.bottomOverlay}>
                        <Text
                            style={[styles.title]}>{!route.params.plant ? 'New plant' : route.params.plant.name}</Text>
                        {route.params.edit &&
                        <Text
                            style={[styles.title]}>{!route.params.plant ? 'New plant' : route.params.plant.nickname}</Text>
                        }
                    </LinearGradient>
                    <SharedElement id={route.params.uri}>
                        <Image
                            style={{
                                width: Dimensions.get('window').width,
                                height: 400,
                                alignSelf: 'center',
                                borderBottomRightRadius: 20,
                                borderBottomLeftRadius: 20,
                            }}
                            source={{uri: 'data:image/png;base64,' + route.params.image}}
                        />
                    </SharedElement>
                </View>

                <View style={styles.formContainer}>
                    {!route.params.plant &&
                    <Text style={[styles.text, {marginBottom: 20}]}>It seems like you've added a plant with the Latin
                        name <Text style={{fontWeight: 'bold'}}>{route.params.plantLatin}</Text> that does not yet
                        exists in our
                        database. Please fill out this form carefully to add it to our database.</Text>
                    }
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, {color: errors.nickname ? '#ED1103' : '#000'}]}>Nickname</Text>
                        <TextInput
                            style={styles.inputField}
                            value={nickname}
                            onChangeText={(text) => setNickname(text)}
                            autoCorrect={true}
                            maxLength={40}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, {color: errors.name ? '#ED1103' : '#000'}]}>Plant name</Text>
                        <TextInput
                            style={styles.inputField}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            autoCorrect={true}
                            editable={!route.params.plant}
                            maxLength={40}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, {color: errors.latinName ? '#ED1103' : '#000'}]}>Latin name</Text>
                        <TextInput
                            style={styles.inputField}
                            value={latinName}
                            onChangeText={(text) => setLatinName(text)}
                            autoCorrect={false}
                            editable={false}
                            maxLength={60}
                        />
                    </View>
                    <Text style={[styles.label, {color: errors.water ? '#ED1103' : '#000'}]}>Water</Text>
                    {route.params.plant &&
                    <Text style={[styles.text]}>These values are an indication of the amount of water that is necessary
                        for this plant. If you think these are incorrect, feel free to change the values.</Text>
                    }

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputField}
                                value={water.toString()}
                                onChangeText={(text) => setWater(text)}
                                keyboardType={"number-pad"}
                                autoCorrect={false}
                                maxLength={4}
                            />
                        </View>
                        <Text style={[styles.label, {marginBottom: 30, fontWeight: 'normal'}]}>cl every </Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.inputField}
                                value={waterDays.toString()}
                                onChangeText={(text) => setWaterDays(text)}
                                keyboardType={"number-pad"}
                                autoCorrect={false}
                                maxLength={4}

                            />
                        </View>
                        <Text style={[styles.label, {marginBottom: 30, fontWeight: 'normal'}]}>days</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, {color: errors.location ? '#ED1103' : '#000'}]}>Location</Text>
                        <TextInput
                            style={[styles.inputField]}
                            value={location}
                            onChangeText={(text) => setLocation(text)}
                            autoCorrect={true}
                            maxLength={100}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text
                            style={[styles.label, {color: errors.description ? '#ED1103' : '#000'}]}>Description</Text>
                        <TextInput
                            multiline={true}
                            style={styles.inputField}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            autoCorrect={true}
                            maxLength={800}
                            editable={!route.params.plant}
                        />
                    </View>

                </View>
                <TouchableOpacity style={{alignItems: 'center', marginBottom: 20}} onPress={!route.params.edit ? addPlant : savePlant}>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginText}>{!route.params.edit ? 'Add plant' : 'Save plant'}</Text>
                    </View>
                </TouchableOpacity>
                {route.params.edit &&
                    <>
                        <Text style={[styles.subTitle, {marginTop: 20}]}>Danger zone</Text>
                        <TouchableOpacity style={{alignItems: 'center', marginBottom: 20}} onPress={deletePlant}>
                            <View style={styles.deleteButton}>
                                <Text style={styles.deleteText}>Remove plant</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                }
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
        borderColor: '#26A66B',
        fontFamily: 'Circular Std',
        color: '#424242'
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
    expandButton: {
        position: 'absolute',
        bottom: 20,
        right: 30,
        zIndex: 40,
        opacity: 0.9,
    },
    bottomOverlay: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 200,
        backgroundColor: '#000',
        zIndex: 20,
        bottom: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        position: 'absolute',
        color: '#fff',
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
        fontSize: 45,
        bottom: 15,
        left: 20
    },
    text: {
        fontFamily: 'Circular Std',
        color: '#575757',
        marginTop: 2,
    },

    deleteButton: {
        backgroundColor: '#e01919',
        width: 250,
        height: 45,
        justifyContent: 'center',
    },
    deleteText: {
        color: '#fff',
        alignSelf: 'center',
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
    },
    subTitle: {
        color: '#1a1a1a',
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
        fontSize: 26,
        marginHorizontal: 35,
        marginBottom: 20,
    },
})
