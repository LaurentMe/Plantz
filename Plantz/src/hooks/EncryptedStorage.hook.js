import React from 'react';
import EncryptedStorage from "react-native-encrypted-storage";

export async function useStoreSession(data) {
    try {
        await EncryptedStorage.setItem(
            'session',
            JSON.stringify({
                session: data
            }),
        );
    } catch (error) {

    }
}

export async function useRetrieveSession() {
    try {
        return JSON.parse(await EncryptedStorage.getItem('session')).session;
    } catch (error) {
        console.log(error);
    }
}

export async function useLogout() {

        try {
            await EncryptedStorage.removeItem("session");
        } catch (error) {
        }
}
