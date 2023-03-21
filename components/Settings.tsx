import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import SettingsBox from "./SettingsBox";
import {useActionSheet} from '@expo/react-native-action-sheet';

import {showPicMenu} from "../Functions/cameraMenu";
import {useEffect, useState} from "react";
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import {useNavigation} from "@react-navigation/native";

const Settings = () => {

    const {showActionSheetWithOptions} = useActionSheet();
    const [selectedImage, setSelectedImage] = useState(require('../assets/icons/profile.png'));
    //@ts-ignore
    const username = global.LOGGED_IN_USER.username
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            //This function will also check if the user has a profile picture stored online once we have a database
            let profilePic = await SecureStore.getItemAsync('profilePic') ?? require('../assets/icons/profile.png');
            setSelectedImage({uri: profilePic});
        })();
    }, []);


    const changeProfilePic = async () => {
        try {
            // @ts-ignore
            let result = await showPicMenu(showActionSheetWithOptions)

            console.log(result);

            if (result === null) return;

            // Use the image to store it locally and use it as the profile picture
            // @ts-ignore
            const selectedAsset = result.assets[0];
            const selectedImageUri = selectedAsset.uri;
            const filename = selectedImageUri.split('/').pop();
            const docDirectoryUri = FileSystem.documentDirectory + filename;

            console.log(filename);
            console.log(selectedImageUri);
            console.log(docDirectoryUri);


            // Store the image locally and use it as the profile picture
            // Copy the selected image to the document directory
            await FileSystem.copyAsync({
                from: selectedImageUri,
                to: docDirectoryUri,
            });

            setSelectedImage({uri: docDirectoryUri});
            //Save uri to local storage
            await SecureStore.setItemAsync('profilePic', docDirectoryUri);

        } catch (e) {
            console.log(e);
        }
    }

    const logout = () => {
        console.log("Logging out");
        // clear the SecureStore of authPayload
        SecureStore.deleteItemAsync('authPayload').then(r => {
            //Go back to settings page
            // @ts-ignore
            navigation.navigate('StartPage');
        });
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.spacer}></View>
            <View style={[styles.header, styles.centerTextHorizontal]}>
                <Text style={[styles.textH1Style]}>Settings</Text>
            </View>
            <View style={styles.profileImageEdit}>
                <TouchableOpacity style={styles.profileImageContainer} onPress={() => changeProfilePic()}>
                    <Image source={selectedImage} style={styles.profileImage}/>
                    <View style={styles.changeContainer}>
                        <Text style={styles.changeText}>Change</Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.textH2Style, styles.marginTop5]}>{username}</Text>
            </View>
            <View style={styles.settingsContainer}>
                <SettingsBox onPressFunction={logout} settingName="Logout" settingInfo="Logging out"/>
            </View>
        </View>
    )
}

export default Settings;