import React from 'react';
import {Image, Text, View} from "react-native";
import {SharedElement} from "react-navigation-shared-element";

function PlantDetails({route, navigation}) {
    return (
        <View>
            <SharedElement id={route.params.index.toString()}>
                <Image
                    style={{
                        width: 90,
                        height: 90,
                        borderRadius: 100,
                        alignSelf: 'center',
                        top: 50,
                    }}
                    source={{uri: 'data:image/png;base64,' + route.params.image}}
                />
            </SharedElement>
        </View>
    );
}

export default PlantDetails;
