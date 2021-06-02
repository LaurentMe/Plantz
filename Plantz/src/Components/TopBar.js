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
})
