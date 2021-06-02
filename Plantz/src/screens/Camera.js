import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    LogBox,
    TouchableHighlight, TouchableNativeFeedback, ActivityIndicator
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
import BackButton from "../Components/BackButton";

function Camera({navigation}) {
    const [isLoading, setIsLoading] = useState(false);

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
                setIsLoading(true);
                axios.post('http://192.168.1.110/api/searchPlant',
                    {
                        image: data.base64
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + session
                        }
                    }).then((response) => {
                    setIsLoading(false);
                    navigation.navigate('AddPlant', {
                        image: data.base64,
                        plantLatin: response.data.plant_name,
                        plant: response.data.plant,
                        uri: data.uri,
                        edit: false
                    });
                }).catch((error) => {
                    setIsLoading(false)
                    console.log(error)
                })
            }).catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
        });
    };

    return (
        <View style={styles.container}>
            <BackButton navigation={navigation}/>
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
                        <>
                            {isLoading &&
                            <View style={styles.loading}>
                                <View style={styles.loadingBox}/>
                                <ActivityIndicator size="small" color="#fff" style={{position: "absolute"}}/>

                            </View>
                            }
                            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={styles.capture}>
                                    <TouchableOpacity onPress={() => takePicture(camera)}>
                                        <View style={styles.innerCircle}>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>

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
    loading: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    loadingBox: {
        backgroundColor: '#777',
        padding: 50,
        borderRadius: 20,
        opacity: 0.4,
    }
});
