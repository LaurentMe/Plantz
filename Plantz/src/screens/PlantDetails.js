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
import LinearGradient from 'react-native-linear-gradient'

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
            <TouchableWithoutFeedback style={{zIndex: 1}} onPress={() => {navigation.goBack()}}>
                <View style={styles.backButton}>
                    <FontAwesomeIcon icon={faArrowLeft} color={'#000'} size={18}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={{zIndex: 10}} onPress={enlarge}>
                <View style={styles.expandButton}>
                    <FontAwesomeIcon icon={faExpandArrowsAlt} color={'#fff'} size={18}/>
                </View>
            </TouchableWithoutFeedback>
            {/*<LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={styles.bottomOverlay}>*/}
                {/*<Text style={styles.title}>{route.params.plant.nickname}</Text>*/}
            {/*</LinearGradient>*/}
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
        top: 40,
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
    bottomOverlay: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 200,
        backgroundColor: '#000',
        zIndex: 20,
        bottom: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        position: 'absolute',
        color: '#fff',
        fontFamily: 'Circular Std',
        fontWeight: 'bold',
        fontSize: 50,
        bottom: 15,
        left: 20
    }
})
