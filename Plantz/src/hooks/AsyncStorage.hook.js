import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function useStorePlants (data) {
    try {
        const jsonValue = JSON.stringify(data)
        await AsyncStorage.setItem('plants', jsonValue)
    } catch (e) {
        // saving error
    }
}

export async function useRetrievePlants (data) {
    try {
        const jsonValue = await AsyncStorage.getItem('plants')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}
