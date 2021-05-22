import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, SafeAreaView, TouchableWithoutFeedback, LogBox} from "react-native";
import {RNCamera} from 'react-native-camera';
import Main from "./Main";
import axios from 'axios';
import Animated from "react-native-reanimated";
import config from '../utils/config';

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
            // axios
            //     .post(
            //         `https://api.plant.id/v2/identify`,
            //         {
            //             api_key: config.get('plantIdKey'),
            //             images: [
            //                 data.base64
            //             ],
            //             plant_language: "nl"
            //         }
            //     )
            //     .then((response) => {
            //         console.log(response.data.suggestions[0].plant_name)
            //
            //         // Do rest of code
            //
            //     })
            //     .catch((error) => {
            //
            //     });
            navigation.navigate('AddPlant', {
                image: data.base64,
                plant: 'Pilea peperomioides'
            });
        });
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={MainScreen}>
                <View style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'<'} Terug</Text>
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
                            <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                                <View style={styles.innerCircle}>
                                </View>
                            </TouchableOpacity>
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
        backgroundColor: '#ddd',
        borderRadius: 100,
        padding: 6,
        alignSelf: 'center',
        margin: 20,
    },
    innerCircle: {
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        color: '#fff',
        width: 80,
        padding: 7,
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: '#222',
        marginTop: 20,
        opacity: 0.40,
        zIndex: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 17,
        marginLeft: 2,
        textAlign: 'center'
    }
});
