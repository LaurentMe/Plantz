import React from 'react';
import {Dimensions, Image, SafeAreaView, Text, StyleSheet, TouchableOpacity, View} from "react-native";
import {SharedElement} from "react-navigation-shared-element";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

function PlantDetails({route, navigation}) {

    const goBack = () => {
        navigation.goBack();
    }


    return (
        <View>
            <TouchableOpacity style={{zIndex: 1}} onPress={goBack}>
                <View style={styles.backButton}>
                    <FontAwesomeIcon icon={faArrowLeft} color={'#000'} size={18}/>
                </View>
            </TouchableOpacity>
            <SharedElement id={route.params.index.toString() + 'image'}>
                <Image
                    style={{
                        width: Dimensions.get('window').width,
                        height: 500,
                        borderRadius: 20,
                        alignSelf: 'center',
                    }}
                    resizeMethod={"resize"}
                    source={{uri: 'data:image/png;base64,' + route.params.image}}
                />
            </SharedElement>


        </View>
    );
}

export default PlantDetails;

const styles = StyleSheet.create({
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
})
