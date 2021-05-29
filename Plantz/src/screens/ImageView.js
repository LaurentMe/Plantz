import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {SharedElement} from "react-navigation-shared-element";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Camera from "./Camera";

function ImageView({navigation, route}) {

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
            <SharedElement id={route.params.uri}>
                <Image
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                        alignSelf: 'center',
                    }}
                    source={{uri: 'data:image/png;base64,' + route.params.image}}
                />
            </SharedElement>
        </View>
    );
}

export default ImageView;

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
