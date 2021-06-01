import React from 'react';
import {
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Share
} from "react-native";
import {SharedElement} from "react-navigation-shared-element";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Camera from "./Camera";
import BackButton from "../Components/BackButton";

function ImageView({navigation, route}) {

    const goBack = () => {
        navigation.goBack();
    }

    return (
        <View>
            <SharedElement id={'back'} style={{zIndex: 4}}>
                <BackButton navigation={navigation}/>
            </SharedElement>
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
