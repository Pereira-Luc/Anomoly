import * as SecureStore from "expo-secure-store";
import { getServer } from "./storeServer";

export const storeProfilePicPerUser = async (userId: string, profilePic: string): Promise<boolean> => {
    const current_Server = await getServer();

    const key_to_store = current_Server + "_serverAddress_" + userId + "_profilePic";
    let validKey = key_to_store.replace(/[^a-z0-9\.\-_]/gi, '_');
    
    return Promise.resolve(
        SecureStore.setItemAsync(validKey, profilePic).then(() => {
            console.log("ProfilePic stored successfully");
            return true;
        }).catch((error) => {
            console.log("Error storing profile pic: " + error);
            return false;
        })
    )
}

//This function gets the private key for a user in the secure storage of the device
export const getProfilePicPerUser = async (userId: string): Promise<string | null> => {
    const current_Server = await getServer();

    const key_to_store = current_Server + "_serverAddress_" + userId + "_profilePic";
    let validKey = key_to_store.replace(/[^a-z0-9\.\-_]/gi, '_');

    return Promise.resolve(
        SecureStore.getItemAsync(validKey).then((profilePic) => {
            console.log("ProfilePic retrieved successfully");
            return profilePic;
        }).catch((error) => {
            console.log("Error User Profile Pic: " + error);
            return null;
        })
    )
}