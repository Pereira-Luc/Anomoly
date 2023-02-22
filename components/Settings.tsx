import {Image, Platform, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import SettingsBox from "./SettingsBox";

import {ActionSheetProvider, useActionSheet} from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';




const Settings = () => {
    const checkPermissions = async (cameraGranted = null, status = null) => {
        if (!cameraGranted) {
            alert('You need to enable camera permissions to work');
            return;
        }
        if (status !== 'granted' && status !== null) {
            alert('You need to enable gallery permissions to work');
            return;
        }
        return true;
    }

    const { showActionSheetWithOptions } = useActionSheet();
    const showPicMenu = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { granted: cameraGranted } = await ImagePicker.getCameraPermissionsAsync();

        const options = ['Take Photo', 'Choose From Gallery', 'Cancel'];
        const cancelButtonIndex = 2;
        const takePhotoIndex = 0;
        const chooseFromGalleryIndex = 1;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                userInterfaceStyle: 'dark',
            },
            (selectedIndex: number) => {
                switch (selectedIndex) {
                    case takePhotoIndex:
                        // Take Photo
                        //Check permissions
                        if (!checkPermissions(cameraGranted)) return;

                        //Open camera
                        ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 0.5,
                        }).then((result) => {
                            if (result.canceled) return;
                            console.log(result);
                        });
                        break;
                    case chooseFromGalleryIndex:
                        // Choose From Gallery
                        //Check permissions
                        if (!checkPermissions(status)) return;

                        //Open gallery
                        ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 0.5,
                        }).then((result) => {
                            if (result.canceled) return;
                            console.log(result);
                        });
                        break;
                    case cancelButtonIndex:
                        // Cancel
                        console.log('Cancel');
                        break;
                }
            }
        )
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.spacer}></View>
            <View style={[styles.header, styles.centerTextHorizontal]}>
                <Text style={[styles.textH1Style]}>Settings</Text>
            </View>
            <View style={styles.profileImageEdit}>
                <TouchableOpacity style={styles.profileImage} onPress={() => showPicMenu()}>
                    <View style={styles.changeContainer}>
                        <Text style={styles.changeText}>Change</Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.textH2Style, styles.marginTop5]}>Profile Name</Text>
            </View>
            <View style={styles.settingsContainer}>
                <SettingsBox />
            </View>
        </View>
    )
}

export default Settings;