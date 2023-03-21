import * as ImagePicker from "expo-image-picker";

const checkPermissionsCamera = async (cameraGranted: boolean): Promise<boolean> => {
    console.log('cameraGranted', cameraGranted);

    if (!cameraGranted) {
        alert('You need to enable camera permissions to work');
        return false;
    }
    return true;
}

const checkPermissionsGallery = async (status: string): Promise<boolean> => {
    console.log('status', status);
    if (status !== 'granted') {
        alert('You need to enable gallery permissions to work');
        return false;
    }
    return true;
}

export const showPicMenu = async (showActionSheetWithOptions = null) => {
    if (showActionSheetWithOptions == null) return;

    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const {granted: cameraGranted} = await ImagePicker.getCameraPermissionsAsync();

    const options = ['Take Photo', 'Choose From Gallery', 'Cancel'];
    const cancelButtonIndex = 2;
    const takePhotoIndex = 0;
    const chooseFromGalleryIndex = 1;

    return new Promise((resolve, reject) => {
        // @ts-ignore
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                userInterfaceStyle: 'dark',
            },
            async (selectedIndex: number) => {
                switch (selectedIndex) {
                    case takePhotoIndex:
                        // Take Photo
                        //Check permissions
                        if (!await checkPermissionsCamera(cameraGranted)) {
                            reject(new Error('Camera permission not granted'));
                            return;
                        }

                        //Open camera
                        let resultCamera = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 0.5,
                        });

                        if (resultCamera.canceled) {
                            reject(new Error('User canceled 1'));
                            return;
                        }

                        //resolve with image
                        resolve(resultCamera);
                        break;
                    case chooseFromGalleryIndex:
                        // Choose From Gallery
                        //Check permissions
                        if (!await checkPermissionsGallery(status)) {
                            reject(new Error('Gallery permission not granted'));
                            return;
                        }

                        //Open gallery
                        let resultLib = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            aspect: [4, 3],
                            quality: 0.5,
                        });

                        if (resultLib.canceled) {
                            reject(new Error('User canceled 2'));
                            return;
                        }

                        //resolve with image
                        resolve(resultLib);
                        break;
                    case cancelButtonIndex:
                        // Cancel
                        console.log('Cancel');
                        reject(new Error('User canceled 3'));
                        break;
                }
            }
        );
    });

};
