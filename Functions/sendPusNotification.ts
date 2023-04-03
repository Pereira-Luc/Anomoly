//All the functions required for push-notifications are in this file
// Using the expo-notifications library
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

//This function registers the device for push notifications src: https://docs.expo.dev/push-notifications/push-notifications-setup/
export const registerForPushNotificationsAsync = async (): Promise<string | null> => {
    //Check if is valid Device
    if (!Device.isDevice) {
        return null
    }

    //console.log("Registering for push notifications");
    //Check if the user has already granted permission for push notifications
    let token;
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        // Ask for permission
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    // If the user has granted permission for push notifications
    if (finalStatus !== 'granted') {
        //console.log('Failed to get push token for push notification!');
        return null;
    }
    // Get the token for the device
    token = (await Notifications.getExpoPushTokenAsync()).data;
    //console.log(token);
    return token;
}

