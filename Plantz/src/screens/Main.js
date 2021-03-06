import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView, Image,
    RefreshControl, TouchableWithoutFeedback, ActivityIndicator, AppState
} from "react-native";
import {useLogout, useRetrieveSession} from "../hooks/EncryptedStorage.hook";
import { useStorePlants, useRetrievePlants } from "../hooks/AsyncStorage.hook";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Svg, {Circle} from "react-native-svg";
import axios from "axios";
import {useIsFocused} from '@react-navigation/native';
import { AuthContext } from "./../hooks/AuthContext";
import Moment from "moment";
import PlantCard from "../Components/PlantCard";
import TopBar from "../Components/TopBar";
import {Notifications} from "react-native-notifications";
import PlantDetails from "./PlantDetails";


function Main({navigation}) {
    const [plants, setPlants] = useState();
    const [searchPlants, setSearchPlants] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const {signOut, dayDifference} = React.useContext(AuthContext);
    const isFocused = useIsFocused();

    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedBackground((notification: Notification, completion)=> {
        console.log(`Notification received in background: ${notification.title} : ${notification.body}`);
        completion({alert: true, sound: true, badge: true});
    })

    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
        console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
        completion({alert: true, sound: true, badge: true});
    });

    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
        navigation.navigate('PlantDetails', {image: notification.payload.userInfo.plant.image, index: notification.payload.userInfo.index, plant: notification.payload.userInfo.plant})
    });

    const setNotification = () => {
        Notifications.postLocalNotification({
            body: "Local notification!",
            title: "Test",
            sound: "chime.aiff",
            silent: false,
            category: "SOME_CATEGORY",
            userInfo: { "plant": "test"}
        });
    }

    AppState.addEventListener('change', state => {
        if (state === 'inactive') {
            useStorePlants(plants);
        }
    });

    useEffect(() => {
        if (plants) {
            Notifications.ios.cancelAllLocalNotifications();
            try {
                plants.forEach((item, index) => {
                    // console.log((Moment(item.next_water_date).format('YYYY-MM-DD') + '\'T\'14:47:30.000Z'))
                    Notifications.postLocalNotification({
                        body: item.nickname + ' needs water',
                        title: item.nickname,
                        sound: "chime.aiff",
                        silent: false,
                        category: "SOME_CATEGORY",
                        userInfo: { "plant": item, "index": index},
                        // fireDate: test.toISOString(),
                        fireDate: new Date(Moment(item.next_water_date).format('YYYY-MM-DD')).toISOString()
                    }, item.id);
                })
            } catch (e) {
                console.log(e)
            }
        }
    }, [plants])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getPlants().then(() => setRefreshing(false));
    }, []);

    const camera = () => {
        navigation.navigate('Camera')
    }

    const details = (plant, index) => {
        navigation.navigate('PlantDetails', {image: plant.image, index: index, plant: plant})
    }

    useEffect(() => {
        getPlants();
    }, [isFocused])

    const getPlants = async () => {
        useRetrieveSession().then((session) => {
            axios.get('http://192.168.1.110/api/plants', {
                headers: {
                    Authorization: "Bearer " + session
                }
            })
                .then(function (response) {
                    setPlants(response.data)
                    setSearchPlants(response.data)
                    setIsLoading(false);
                })
                .catch(function (error) {
                    useRetrievePlants().then((plants) => {
                        setPlants(plants)
                        setSearchPlants(plants)
                        setIsLoading(false)
                    }).catch((error) => {
                        console.log(error)
                    })
                });
        }).catch((error) => {
            console.log(error)
        })
    }

    function search(text) {
        setSearchPlants(plants.filter(i => {
            if (i.nickname.toLowerCase().includes(text.toLowerCase())) {
                return i;
            }
        }))
    }

    return (
        <View style={styles.container}>
            <View style={{
                position: 'absolute',
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height
            }}>
                <Svg viewBox="0 0 40 40">
                    <Circle
                        cx="-18"
                        cy="50"
                        r="50"
                        strokeWidth="2.5"
                        fill="#26A66B"
                    />
                </Svg>
            </View>
            <TopBar search={search} signOut={signOut}/>
            <ScrollView style={styles.scrollViewContainers} showsVerticalScrollIndicator={false}>
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                <View style={styles.secondContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>My Plants</Text>
                        <TouchableOpacity onPress={camera} style={{zIndex: 1000}}>
                            <FontAwesomeIcon icon={faPlusCircle} size={30} color={'#1F6F4A'}
                                             style={{top: 4, marginRight: 4, zIndex: 1000}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {isLoading ?
                    <ActivityIndicator size="small" color="#000000"/>
                    :
                    <View style={styles.cardsContainer}>
                        {searchPlants.map((item, index) => {
                            return (
                                <PlantCard
                                    item={item}
                                    index={index}
                                    details={details}
                                    key={item.created_at}
                                />
                            )
                        })}
                        <TouchableWithoutFeedback onPress={() => camera()}>
                            <View>
                                <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.plantzImg}
                                        source={require('../assets/logo/logoPlantz.png')}
                                    />
                                </View>
                                <View style={[styles.card, {justifyContent: "center"}]}>
                                    <FontAwesomeIcon icon={faPlusCircle} size={30} color={'#1F6F4A'}
                                                     style={{alignSelf: 'center'}}/>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                }
            </ScrollView>
        </View>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
        fontFamily: 'Circular Std',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 1,
        paddingBottom: 15,
        borderColor: '#eee',
    },
    imageContainer: {
        width: 90,
        height: 90,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        zIndex: 20,
        shadowColor: '#444',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.40,
        shadowRadius: 6,
    },
    plantzImg: {
        width: 90,
        height: 90,
        borderRadius: 100,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 34,
        width: 280,
        marginLeft: 30,
    },
    secondContainer: {
        marginHorizontal: 35,
        paddingBottom: 10,
        borderColor: '#eee',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        marginTop: 10,
        fontSize: 28,
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
        color: '#1F6F4A'
    },
    cardsContainer: {
        marginHorizontal: 25,
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        width: 150,
        height: 170,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#444',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.4,
        shadowRadius: 12,
        margin: 6,
        marginTop: 50,
        marginBottom: 15
    },
    cardTitle: {
        fontFamily: 'Circular Std',
        fontWeight: '600',
        alignSelf: 'center',
        marginTop: 50,
        color: '#373737',
        fontSize: 15
    },
    cardText: {
        marginTop: 15,
        marginHorizontal: 15,
        color: '#373737',
        fontFamily: 'Circular Std',
    },
    textBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    text: {
        fontFamily: 'Circular Std',
        fontSize: 14,
    },
    waterStatus: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: 30,
        bottom: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    waterStatusText: {
        fontFamily: 'Circular Std',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    }
})
