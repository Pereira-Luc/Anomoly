import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import SettingsBox from "./SettingsBox";
import {useActionSheet} from '@expo/react-native-action-sheet';

import {showPicMenu} from "../Functions/cameraMenu";
import {useEffect, useState} from "react";
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';
import {useNavigation} from "@react-navigation/native";
import {useMutation} from "@apollo/client";
import {SAVE_PROFILE_PIC} from "../constants/graphql/mutations/saveProfilePic";
import {manipulateAsync, SaveFormat} from 'expo-image-manipulator';
import {getProfilePicPerUser, storeProfilePicPerUser} from "../Functions/storeProfilePicPerUser";
import {CopyPrivateKeyPopUp} from "./CopyPrivatKeyPopUp";
import {getPrivateKeyPerUser} from "../Functions/storePrivateKeyPerUser";

const Settings = () => {

    const {showActionSheetWithOptions} = useActionSheet();
    const [selectedImage, setSelectedImage] = useState(require('../assets/icons/profile.png'));
    let [secretKeyPage, secretKeyViability] = useState(false);
    const [secretKey, setSecretKey] = useState('');

    //@ts-ignore
    const username = global.LOGGED_IN_USER.username
    //@ts-ignore
    const userId = global.LOGGED_IN_USER._id
    const navigation = useNavigation();

    const [saveProfilePic, {loading: mutationLoading, error: mutationError}] = useMutation(SAVE_PROFILE_PIC)

    useEffect(() => {
        (async () => {
            //This function will also check if the user has a profile picture stored online once we have a database
            let defaultImage = require('../assets/icons/profile.png');
            let profilePic = await getProfilePicPerUser(userId);

            if (profilePic === null) {
                setSelectedImage(defaultImage);
                return;
            }


            setSelectedImage({uri: profilePic});
        })();
    }, []);


    const changeProfilePic = async () => {
        try {
            // @ts-ignore
            let result = await showPicMenu(showActionSheetWithOptions)


            if (result === null) return;

            // Use the image to store it locally and use it as the profile picture
            // @ts-ignore
            const selectedAsset = result.assets[0];
            const selectedImageUri = selectedAsset.uri;
            const filename = selectedImageUri.split('/').pop();
            const docDirectoryUri = FileSystem.documentDirectory + filename;


            // Store the image locally and use it as the profile picture
            // Copy the selected image to the document directory
            await FileSystem.copyAsync({
                from: selectedImageUri,
                to: docDirectoryUri,
            });


            //Check size of image MAX 16MB
            const info = await FileSystem.getInfoAsync(docDirectoryUri);
            console.log(`File size: ${info.size} bytes`);

            if (info.size === null || typeof info.size === 'undefined') {
                return;
            }

            // Resize the image to something smaller
            const resizedImage = await manipulateAsync(
                docDirectoryUri,
                [{resize: {width: 500}}],
                {compress: 0.5, format: SaveFormat.JPEG, base64: true}
            );

            setSelectedImage({uri: docDirectoryUri});

            //Send base64 to database
            saveProfilePic({variables: {image: resizedImage.base64}}).then(r => {
                console.log(r);
            }).catch(e => {
                console.log(e);
            })

            //Save uri to local storage for logging in user
            await storeProfilePicPerUser(userId, docDirectoryUri);


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

    const setSecretKeyPageViability = () => {
        secretKeyViability(!secretKeyPage);
    }


    //get secret key from user
    useEffect(() => {

        getPrivateKeyPerUser(userId).then((key: string | null) => {
            if (key) {
                setSecretKey(key)
            }
        })

    }, [])

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
            {!secretKeyPage && <View style={styles.settingsContainer}>
                <SettingsBox onPressFunction={setSecretKeyPageViability} settingName="Secret Key"
                             settingInfo="Open window for the Secret Key"/>
                <SettingsBox onPressFunction={logout} settingName="Logout" settingInfo="Logging out"/>
            </View>}

            {secretKeyPage && <View style={styles.settingsContainer}>
                <CopyPrivateKeyPopUp privateKey={secretKey} setPrivateKey={setSecretKeyPageViability}/>
            </View>}
        </View>
    )
}

export default Settings;