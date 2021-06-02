import React from 'react';
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {SharedElement} from "react-native-shared-element";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faExpandArrowsAlt, faPlusCircle, faSave} from "@fortawesome/free-solid-svg-icons";


function EnlargeButton({enlarge}) {

    return (
        <TouchableWithoutFeedback style={{zIndex: 700}} onPress={enlarge}>
            <View style={styles.saveButton}>
                <FontAwesomeIcon icon={faExpandArrowsAlt} color={'#fff'} size={18}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default EnlargeButton;

const styles = StyleSheet.create({
    saveButton: {
        position: 'absolute',
        bottom: -385,
        right: 15,
        color: '#fff',
        zIndex: 70,
        borderRadius: 200,
        padding: 12,
        opacity: 0.9,
    },
})
