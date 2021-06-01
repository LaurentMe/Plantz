import React from 'react';
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {SharedElement} from "react-native-shared-element";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faPlusCircle, faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons";


function BackButton({navigation}) {
    return (
        <TouchableWithoutFeedback style={{zIndex: 40}} onPress={() => navigation.goBack()}>
            <View style={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} color={'#000'} size={18}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default BackButton;

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
