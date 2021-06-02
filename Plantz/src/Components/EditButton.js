import React from 'react';
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {SharedElement} from "react-native-shared-element";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEdit, faPlusCircle, faExpandArrowsAlt, faSave} from "@fortawesome/free-solid-svg-icons";


function BackButton({navigation, plant}) {

    const edit = () => {
        navigation.navigate('AddPlant', {
            image: plant.image,
            plantLatin: plant.plant.latin_name,
            plant: plant,
            uri: plant.created_at,
            edit: true
        });
    }

    return (
        <TouchableWithoutFeedback style={{zIndex: 40, width: Dimensions.get('window').width}} onPress={edit}>
            <View style={styles.editButton}>
                <FontAwesomeIcon icon={faEdit} color={'#000'} size={18}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default BackButton;

const styles = StyleSheet.create({
    editButton: {
        position: 'absolute',
        top: 40,
        right: -350,
        color: '#fff',
        backgroundColor: '#fff',
        zIndex: 20,
        borderRadius: 200,
        padding: 12,
        opacity: 0.9,
    },
})
