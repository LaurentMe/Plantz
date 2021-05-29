import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView, Image,
    RefreshControl
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import {useLogout, useRetrieveSession} from "../hooks/EncryptedStorage.hook";
import {Button, ThemeProvider} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser, faSearch, faPlusCircle, faTint, faSyncAlt, faSun} from '@fortawesome/free-solid-svg-icons'
import Svg, {Circle} from "react-native-svg";
import axios from "axios";
import {useIsFocused} from '@react-navigation/native';
import {err} from "react-native-svg/lib/typescript/xml";

function Main({navigation}) {
    const [search, setSearch] = useState(null);
    const [plants, setPlants] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getPlants().then(() => setRefreshing(false));
    }, []);

    const logout = () => {
        useLogout().then(() => {
            navigation.replace('Login')
        }).catch((error) => {
        });
    }
    const camera = () => {
        navigation.navigate('Camera')
    }

    useEffect(() => {
        getPlants();
    }, [isFocused])

    const getPlants = async () => {
        useRetrieveSession().then((session) => {
            axios.get('http://192.168.1.110/api/plants', {
                headers: {
                    Authorization: "Bearer " + session.token
                }
            })
                .then(function (response) {
                    setPlants(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error)
        })
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
            <SafeAreaView>
                <View style={styles.topContainer}>
                    <View style={styles.searchContainer}>
                        <FontAwesomeIcon icon={faSearch} color={'#888'} style={{marginLeft: 8}}/>
                        <TextInput
                            style={[{
                                borderColor: '#e0ddd7',
                                paddingVertical: 4,
                                paddingHorizontal: 10,
                                height: 34,
                                borderRadius: 3,
                                marginVertical: 10,
                                width: 280,
                                fontFamily: 'Circular Std'
                            }]}
                            placeholder="Zoek op naam"
                            placeholderTextColor={'#888'}
                            onChangeText={(text) => search(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={logout}>
                        <View
                            style={{
                                backgroundColor: '#ddd',
                                padding: 7,
                                marginRight: 20,
                                borderRadius: 100,
                                borderWidth: 1,
                                borderColor: '#ececec',
                            }}
                        >
                            <FontAwesomeIcon size={20} icon={faUser} color={'#545454'}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView style={styles.scrollViewContainers}>
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
                <View style={styles.secondContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>My Plants</Text>
                        <TouchableOpacity onPress={camera}>
                            <FontAwesomeIcon icon={faPlusCircle} size={30} color={'#1F6F4A'}
                                             style={{top: 4, marginRight: 4}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cardsContainer}>
                    {plants.map((item, index) => {
                        return (
                            <View key={index} style={{marginTop: -40}}>
                                <View style={{
                                    shadowColor: '#444',
                                    shadowOffset: {width: 0, height: 0},
                                    shadowOpacity: 0.40,
                                    shadowRadius: 6,
                                    zIndex: 10,
                                }}>
                                    <Image
                                        style={{
                                            width: 90,
                                            height: 90,
                                            borderRadius: 100,
                                            alignSelf: 'center',
                                            top: 50,
                                        }}
                                        source={{uri: 'data:image/png;base64,' + item.image}}
                                    />
                                </View>
                                <View style={styles.card}>
                                    <Text style={styles.cardTitle}>{item.nickname}</Text>
                                    <View style={styles.cardText}>
                                        <View style={styles.textBox}>
                                            <FontAwesomeIcon icon={faTint} style={{marginRight: 5}} color={'#373737'}/>
                                            <Text style={styles.text}>{item.plant.water_amount}ml</Text>
                                        </View>
                                        <View style={styles.textBox}>
                                            <FontAwesomeIcon icon={faSyncAlt} style={{marginRight: 5}}
                                                             color={'#373737'}/>
                                            <Text style={styles.text}>{item.plant.days_between_water} days</Text>
                                        </View>
                                        <View style={styles.textBox}>
                                            <FontAwesomeIcon icon={faSun} style={{marginRight: 5}} color={'#373737'}/>
                                            <Text style={styles.text}>{item.plant.days_between_water} days</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
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
        borderBottomWidth: 1,
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
        shadowOpacity: 0.2,
        shadowRadius: 6,
        margin: 6,
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
    scrollViewContainers: {}
})
