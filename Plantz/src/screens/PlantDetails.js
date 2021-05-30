import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback
} from "react-native";
import {SharedElement} from "react-navigation-shared-element";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft, faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons";

function PlantDetails({route, navigation}) {

    const goBack = () => {
        navigation.goBack();
    }

    const enlarge = () => {
        navigation.navigate('ImageView', {
            image: route.params.image,
            uri: route.params.uri
        })
    }


    return (
        <View>
            <TouchableOpacity style={{zIndex: 1}} onPress={goBack}>
                <View style={styles.backButton}>
                    <FontAwesomeIcon icon={faArrowLeft} color={'#000'} size={18}/>
                </View>
            </TouchableOpacity>
            <TouchableWithoutFeedback style={{zIndex: 10}} onPress={enlarge}>
                <View style={styles.expandButton}>
                    <FontAwesomeIcon icon={faExpandArrowsAlt} color={'#fff'} size={18}/>
                </View>
            </TouchableWithoutFeedback>
            <SharedElement id={route.params.image}>
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
    expandButton: {
        position: 'absolute',
        bottom: 20,
        right: 30,
        zIndex: 40,
        opacity: 0.9,
    },
})
