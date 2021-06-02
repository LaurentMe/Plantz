import React from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {SharedElement} from "react-navigation-shared-element";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCalendarAlt, faCheck, faPlusCircle, faTint} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../hooks/AuthContext";
import Moment from "moment";

function PlantCard({navigation, details,item, index,}) {
    const {dayDifference} = React.useContext(AuthContext);

    return (
        <View>
            <View style={{
                shadowColor: '#444',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.50,
                shadowRadius: 4,
                zIndex: 10,
                position: "absolute",
                alignSelf: 'center',
            }}>
                <TouchableWithoutFeedback onPress={() => details(item, index)}>
                    <SharedElement id={item.created_at.toString()} style={{zIndex: 0}}>
                        <Image
                            style={{
                                width: 90,
                                height: 90,
                                borderRadius: 100,
                                alignSelf: 'center',
                            }}
                            source={{uri: 'data:image/png;base64,' + item.image}}
                        />
                    </SharedElement>
                </TouchableWithoutFeedback>

            </View>
            <TouchableWithoutFeedback onPress={() => details(item, index)}>
                <View style={styles.card}>
                    <SharedElement id={item.nickname + item.created_at.toString()}>
                        <Text style={styles.cardTitle}>{item.nickname}</Text>
                    </SharedElement>
                    <View style={styles.cardText}>
                        <SharedElement id={'water' + item.id}>
                            <View style={styles.textBox}>
                                <FontAwesomeIcon icon={faTint} style={{marginRight: 5}}
                                                 color={'#373737'}/>
                                <Text style={styles.text}>{item.custom_water_amount}cl</Text>
                            </View>
                        </SharedElement>
                        <SharedElement id={'waterDays' + item.id}>
                            <View style={styles.textBox}>
                                <FontAwesomeIcon icon={faCalendarAlt} style={{marginRight: 5}}
                                                 color={'#373737'}/>
                                <Text style={styles.text}>{Moment(item.next_water_day).format('DD/MM/YYYY')}</Text>
                            </View>
                        </SharedElement>
                    </View>
                    <View
                        style={[styles.waterStatus, {backgroundColor: dayDifference(item.next_water_day) < 0 ? '#F01002' : dayDifference(item.next_water_day) === 0 ? '#F07202' : '#23B571'}]}>
                        <Text
                            style={styles.waterStatusText}>{dayDifference(item.next_water_day) > 0 ? 'Just fine' : 'Add water'}</Text>
                        <FontAwesomeIcon
                            icon={dayDifference(item.next_water_day) > 0 ? faCheck : faPlusCircle}
                            size={20} color={'#fff'} style={{}}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default PlantCard;

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 170,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#444',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.4,
        shadowRadius: 12,
        margin: 6,
        marginTop: 50,
        marginBottom: 15
    },
    cardTitle: {
        fontFamily: 'Circular Std',
        fontWeight: '600',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 50,
        color: '#373737',
        fontSize: 15,
        maxWidth: 140
    },
    cardText: {
        position: 'absolute',
        marginHorizontal: 15,
        color: '#373737',
        fontFamily: 'Circular Std',
        bottom: 40,
    },
    textBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    text: {
        fontFamily: 'Circular Std',
        fontSize: 14,
    },
    waterStatus: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: 30,
        bottom: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    waterStatusText: {
        fontFamily: 'Circular Std',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    }
})
