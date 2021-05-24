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
import {useLogout, useRetrieveSession} from "../hooks/EncryptedStorage.hook";
import {Button, ThemeProvider} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser, faSearch, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Svg, {Circle} from "react-native-svg";
import axios from "axios";
import { useIsFocused } from '@react-navigation/native';

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
            axios.get('http://localhost:8080/api/plants', {
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
        })
    }

    return (
        <View style={styles.container}>
            <View style={{position: 'absolute', width: Dimensions.get("window").width, height: Dimensions.get("window").height}}>
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
                                borderRadius: 6
                            }}
                        >
                            <FontAwesomeIcon size={20} icon={faUser} color={'#888'}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                    <View style={styles.secondContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>My Plants</Text>
                            <TouchableOpacity onPress={camera}>
                                <FontAwesomeIcon icon={faPlusCircle} size={30} color={'#26A66B'} style={{top: 4, marginRight: 4}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.cardsContainer}>
                        {plants.map((item, index) => {
                            return(
                            <View style={styles.card} key={index}>
                                <View
                                    style={{
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 100,
                                            marginTop: 6
                                        }}
                                        source={{uri: 'data:image/png;base64,' + item.image}}
                                    />
                                    <Text>{item.plant.name}</Text>
                                </View>
                            </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        borderRadius: 4,
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
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#1F6F4A'
    },
    cardsContainer: {
        marginHorizontal: 25,
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        width: 150,
        height: 170,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#444',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        margin: 6,
    }
})
