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
            <View>
                <TouchableWithoutFeedback onPress={() => {
                    navigation.goBack()
                }}>
                    <SharedElement id={'back'} style={[{zIndex: 20, position: "absolute"}]}>
                        <View style={styles.backButton}>
                            <FontAwesomeIcon icon={faArrowLeft} color={'#000'} size={18} style={{zIndex: 20}}/>
                        </View>
                    </SharedElement>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => {
                    enlarge()
                }}>
                    <SharedElement id={'enlarge'} style={[{zIndex: 30, position: "absolute"}]}>
                        <View style={styles.expandButton}>
                            <FontAwesomeIcon icon={faExpandArrowsAlt} color={'#000'} size={18} style={{zIndex: 20}}/>
                        </View>
                    </SharedElement>
                </TouchableWithoutFeedback>

                <SharedElement id={'overlay'} style={[{zIndex: 10, position: "absolute"}]}>
                    <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={{
                        top: 300,
                        width: Dimensions.get('window').width,
                        height: 200,
                        zIndex: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    }}>
                        <Text style={styles.title}>hallo</Text>
                    </LinearGradient>
                </SharedElement>

                <SharedElement id={route.params.image}>
                    <Image
                        style={{
                            width: Dimensions.get('window').width,
                            height: 500,
                            alignSelf: 'center',
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                        }}
                        resizeMethod={"resize"}
                        source={{uri: 'data:image/png;base64,' + route.params.image}}
                    />
                </SharedElement>
            </View>
            <Text>Hallo</Text>

        </View>
    );
}

export default PlantDetails;

const styles = StyleSheet.create({
    backButton: {
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
        top: 435,
        right: -310,
        color: '#fff',
        backgroundColor: '#fff',
        zIndex: 20,
        borderRadius: 200,
        padding: 12,
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
