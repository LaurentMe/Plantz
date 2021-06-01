import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSearch, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

function TopBar({navigation, search, signOut}) {
    return (
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
                        placeholder="Search..."
                        placeholderTextColor={'#888'}
                        onChangeText={(text) => search(text)}
                    />
                </View>
                <TouchableOpacity onPress={() => signOut()}>
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
                        <FontAwesomeIcon size={20} icon={faSignOutAlt} color={'#545454'}/>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default TopBar;

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
