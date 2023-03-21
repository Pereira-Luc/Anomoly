import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import React from "react";

import {decode as decodeBase64, encode as encodeBase64} from "@stablelib/base64";
import {checkPrivateKey} from "../Functions/crypto";
import {storePrivateKeyPerUser} from "../Functions/storePrivateKeyPerUser";
import {useNavigation} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export const MissingPrivateKeyPopUp = ({data, setPrivateKey}: any) => {
    const navigation = useNavigation();
    // PrimaryPrivateKey will be a Base64 that needs to be decoded
    const [primaryPrivateKey, setPrimaryPrivateKey] = React.useState('');
    const [validPrivateKey, setValidPrivateKey] = React.useState(true);

    const savePrivateKey = async () => {
        //TODO: Save private key to SecureStore
        console.log("Saving private key");
        console.log("Private Key: " + primaryPrivateKey.replace(/\s/g, ''));
        //remove all whitespaces from private key


        //TODO: Check if private key is valid with the private key of the user
        const secretKey: Uint8Array = decodeBase64(primaryPrivateKey.replace(/\s/g, ''));
        const publicKey: Uint8Array = decodeBase64(data.user.publicKey);
        const userId = data.user._id;
        console.log("Checking private key");
        console.log("Public Key: " + publicKey);
        console.log("Secret Key: " + secretKey)

        if (checkPrivateKey(publicKey, secretKey)) {
            console.log("Private Key is valid");
            console.log("Saving private key to SecureStore");
            let success = await storePrivateKeyPerUser(userId, encodeBase64(secretKey));
            if (success) {
                //add data to SecureStore
                let data2 = JSON.stringify(data);
                await SecureStore.setItemAsync('authPayload', data2)

                //@ts-ignore
                global.LOGGED_IN_USER = data.user

                // @ts-ignore
                navigation.navigate("MainPage")
            }
            console.log("Private Key is valid");
        } else {
            setValidPrivateKey(false);
            console.log("Private Key is not valid");
        }
    }

    const exitScreen = () => {
        setPrivateKey(null);
    }


    return (
        <View style={[styles.privateKeyBox]}>
            <View style={styles.privateKeyBoxHeader}>
                <Text style={styles.privateKeyBoxHeaderTitle}> Secret key is Missing:{"\n"} Please paste it and save
                    !!!</Text>
            </View>
            <View style={styles.privateKeyBoxBody}>
                {validPrivateKey ? null : <Text style={styles.privateKeyCopyInfo}>Invalid Private Key</Text>}
                <TextInput multiline={true} editable={true} style={styles.privateKeyText}
                           onChangeText={(input) => setPrimaryPrivateKey(input)}></TextInput>
            </View>
            <View>
                <TouchableOpacity style={styles.privateKeyBoxButton} onPress={() => savePrivateKey()}>
                    <Text style={styles.privateKeyBoxButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.privateKeyBoxButtonClose} onPress={() => exitScreen()}>
                    <Text style={styles.privateKeyBoxButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}