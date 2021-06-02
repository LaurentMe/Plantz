import React from 'react';
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {SharedElement} from "react-native-shared-element";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faPlusCircle, faSave} from "@fortawesome/free-solid-svg-icons";


function SaveButton({savePlant}) {

    return (
        <TouchableWithoutFeedback style={{zIndex: 40}} onPress={savePlant}>
            <View style={styles.saveButton}>
                <FontAwesomeIcon icon={faSave} color={'#000'} size={18}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default SaveButton;

const styles = StyleSheet.create({
    saveButton: {
        position: 'absolute',
        top: 30,
        right: 30,
        color: '#fff',
        backgroundColor: '#fff',
        zIndex: 20,
        borderRadius: 200,
        padding: 12,
        opacity: 0.9,
    },
})
