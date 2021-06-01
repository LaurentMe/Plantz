import React, {useState} from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback, ScrollView
} from "react-native";
import {SharedElement} from "react-navigation-shared-element";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faExpandArrowsAlt, faTint, faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import LinearGradient from 'react-native-linear-gradient'
import Moment from 'moment';
import {useRetrieveSession} from "../hooks/EncryptedStorage.hook";
import axios from "axios";
import {AuthContext} from "../hooks/AuthContext";
import BackButton from "../Components/BackButton";

function PlantDetails({route, navigation}) {
    const {dayDifference} = React.useContext(AuthContext);
    const [plant, setPlant] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const goBack = () => {
        navigation.goBack();
    }

    const enlarge = () => {
        navigation.navigate('ImageView', {
            image: route.params.image,
            uri: 'image'
        })
    }

    const getPlant = () => {
        useRetrieveSession().then((session) => {
            axios.get('http://192.168.1.110/api/plants/' + route.params.plant.id, {
                headers: {
                    Authorization: "Bearer " + session
                }
            })
                .then(function (response) {
                    setPlant(response.data.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error)
        })
    }

    const updateWater = () => {
        useRetrieveSession().then((session) => {
            axios.get('http://192.168.1.110/api/updateWater/' + route.params.plant.id, {
                headers: {
                    Authorization: "Bearer " + session
                }
            })
                .then(function (response) {
                    setPlant(response.data.data)
                    navigation.goBack();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error)
        })
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
        <ScrollView>
            <View>
                <SharedElement id={'back'} style={[{zIndex: 40, position: "absolute"}]}>
                    <BackButton navigation={navigation}/>
                </SharedElement>
                <SharedElement id={'water' + route.params.index} style={[{zIndex: 30, position: "absolute"}]}>
                    <View style={[styles.bottomIcons, {flexDirection: 'row', alignItems: 'center'}]}>
                        <FontAwesomeIcon icon={faTint} color={'#fff'} size={20} style={{zIndex: 20}}/>
                        <Text style={[styles.text, {
                            color: '#fff',
                            marginLeft: 2
                        }]}>{route.params.plant.custom_water_amount}ml</Text>
                    </View>
                </SharedElement>
                <SharedElement id={'waterDays' + route.params.index} style={[{zIndex: 30, position: "absolute"}]}>
                    <View style={[styles.bottomIcons, {flexDirection: 'row', alignItems: 'center', marginTop: 30}]}>
                        <FontAwesomeIcon icon={faCalendarAlt} color={'#fff'} size={20} style={{zIndex: 20}}/>
                        <Text style={[styles.text, {
                            color: '#fff',
                            marginLeft: 4
                        }]}>{dayDifference(route.params.plant.last_water_day, route.params.plant.custom_water_days)} days</Text>
                    </View>
                </SharedElement>

                <SharedElement id={'overlay'} style={[{zIndex: 10, position: "absolute"}]}>
                    <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={{
                        top: 300,
                        width: Dimensions.get('window').width,
                        height: 200,
                        zIndex: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    }}>
                    </LinearGradient>
                </SharedElement>
                <SharedElement id={route.params.plant.nickname} style={[{zIndex: 10, position: "absolute"}]}>
                    <Text style={{
                        top: 410,
                        color: '#fff',
                        fontFamily: 'Circular Std',
                        fontWeight: 'bold',
                        fontSize: 50,
                        left: 20
                    }}>{route.params.plant.nickname}</Text>
                </SharedElement>
                <SharedElement id={'date'} style={[{zIndex: 10, position: "absolute"}]}>
                    <Text style={{
                        top: 465,
                        color: '#575757',
                        fontFamily: 'Circular Std',
                        fontWeight: 'bold',
                        fontSize: 20,
                        left: 22
                    }}>{Moment(route.params.plant.created_at).format('DD/MM/YYYY')}</Text>
                </SharedElement>
                <SharedElement id={route.params.plant.created_at.toString()}>
                    <Image
                        style={{
                            width: Dimensions.get('window').width,
                            height: 500,
                            alignSelf: 'center',
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                        }}
                        resizeMethod={"resize"}
                        source={{uri: 'data:image/png;base64,' + route.params.image}}
                    />
                </SharedElement>
            </View>
            <TouchableOpacity onPress={updateWater}>
                <View
                    style={[styles.addWater, {backgroundColor: dayDifference(route.params.plant.last_water_day, route.params.plant.custom_water_days) < 0 ? '#F01002' : dayDifference(route.params.plant.last_water_day, route.params.plant.custom_water_days) === 0 ? '#F07202' : '#23B571'}]}>
                    <Text
                        style={styles.addWaterText}>{dayDifference(route.params.plant.last_water_day, route.params.plant.custom_water_days) > 0 ? 'Everything is just fine' : 'Add water to ' + route.params.plant.nickname}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text style={styles.subTitle}>Location</Text>
                <Text style={styles.bigText}>{route.params.plant.location}</Text>
                <Text style={styles.subTitle}>Scientific name</Text>
                <Text style={styles.bigText}>{route.params.plant.plant.latin_name}</Text>
                <Text style={[styles.subTitle]}>Description</Text>
                <Text style={styles.text}>{route.params.plant.plant.description}</Text>
                <Text style={[styles.subTitle, {marginTop: 20}]}>Danger zone</Text>
            </View>

            <TouchableOpacity onPress={deletePlant}>
                <View style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Remove plant</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default PlantDetails;

const styles = StyleSheet.create({
    bottomIcons: {
        top: 415,
        right: -280,
        zIndex: 20,
        borderRadius: 200,
        padding: 12,
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
        fontSize: 50,
        bottom: 15,
        left: 20
    },
    infoContainer: {
        marginHorizontal: 30,
        marginTop: 10,
        marginBottom: 20,
    },
    subTitle: {
        color: '#1a1a1a',
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
        fontSize: 26,
    },
    bigText: {
        color: '#575757',
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10
    },
    text: {
        color: '#575757',
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
        fontSize: 14,
    },
    deleteButton: {
        alignSelf: 'center',
        backgroundColor: '#e01919',
        width: 280,
        height: 45,
        justifyContent: 'center',
        marginBottom: 30
    },
    deleteText: {
        color: '#fff',
        alignSelf: 'center',
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
    },
    addWater: {
        marginTop: 20,
        marginHorizontal: 30,
        padding: 18,
        alignItems: 'center',
        borderRadius: 5,
    },
    addWaterText: {
        color: '#fff',
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
        fontSize: 24,
    }
})
