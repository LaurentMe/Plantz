import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    LogBox,
    TouchableHighlight, TouchableNativeFeedback
} from "react-native";
import {RNCamera} from 'react-native-camera';
import Main from "./Main";
import axios from 'axios';
import Animated from "react-native-reanimated";
import config from '../utils/config';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {useRetrieveSession} from "../hooks/EncryptedStorage.hook";
import AddPlant from "./AddPlant";

function Camera({navigation}) {

    const PendingView = () => (
        <View
            style={{
                flex: 1,
                backgroundColor: 'lightgreen',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Waiting</Text>
        </View>
    );

    const MainScreen = () => {
        navigation.goBack();
    }

    const takePicture = async function (camera) {
        const options = {quality: 0.5, base64: true};
        await camera.takePictureAsync(options).then((data) => {
            useRetrieveSession().then((session) => {
                axios.post('http://192.168.1.110/api/searchPlant',
                    {
                        image: data.base64
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + session
                        }
                    }).then((response) => {
                    navigation.navigate('AddPlant', {
                        image: data.base64,
                        plantLatin: response.data.plant_name,
                        plant: response.data.plant,
                        uri: data.uri
                    });
                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
        });
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={MainScreen}>
                {/*<View style={styles.backButton}>*/}
                {/*    <FontAwesomeIcon icon={faChevronLeft} color={'#fff'}/>*/}
                {/*    <Text style={styles.backButtonText}>Terug</Text>*/}
                {/*</View>*/}
                <View style={styles.backButton2}>
                    <FontAwesomeIcon icon={faArrowLeft} color={'#000'} size={18}/>
                </View>
            </TouchableWithoutFeedback>
            <RNCamera
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={"auto"}
                captureAudio={false}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                {({camera, status, recordAudioPermissionStatus}) => {
                    if (status !== 'READY') return <PendingView/>;
                    return (
                        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={styles.capture}>
                                <TouchableOpacity onPress={() => takePicture(camera)}>
                                    <View style={styles.innerCircle}>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            </RNCamera>
        </View>
    );
}

export default Camera;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 100,
        padding: 6,
        alignSelf: 'center',
        margin: 20,
    },
    innerCircle: {
        padding: 27,
        backgroundColor: '#fff',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'black'
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        color: '#fff',
        width: 80,
        padding: 7,
        paddingVertical: 8,
        borderRadius: 15,
        backgroundColor: '#222',
        marginTop: 20,
        opacity: 0.50,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backButton2: {
        position: 'absolute',
        top: 40,
        left: 30,
        color: '#fff',
        backgroundColor: '#fff',
        zIndex: 20,
        borderRadius: 200,
        padding: 15,
        opacity: 0.9,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 17,
        marginLeft: 2,
        textAlign: 'center'
    },

});
