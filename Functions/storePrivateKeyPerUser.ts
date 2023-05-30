//This function stores the private key for a user in the secure storage of the device
import * as SecureStore from "expo-secure-store";
import { getServer } from "./storeServer";

export const storePrivateKeyPerUser = async (userId: string, privateKey: string): Promise<boolean> => {
    const current_Server = await getServer();

    const key_to_store = current_Server + "_serverAddress_" + userId + "_privateKey";
    let validKey = key_to_store.replace(/[^a-z0-9\.\-_]/gi, '_');

    return Promise.resolve(
        //Get Current Server To Store
        SecureStore.setItemAsync(validKey, privateKey).then(() => {
            console.log("Private key stored successfully");
            return true;
        }).catch((error) => {
            console.log("Error storing private key: " + error);
            return false;
        })
    )
}

//This function gets the private key for a user in the secure storage of the device
export const getPrivateKeyPerUser = async (userId: string): Promise<string | null> => {
    const current_Server = await getServer();

    const key_to_store = current_Server + "_serverAddress_" + userId + "_privateKey";
    let validKey = key_to_store.replace(/[^a-z0-9\.\-_]/gi, '_');

    return Promise.resolve(
        SecureStore.getItemAsync(validKey).then((privateKey) => {
            console.log("Private key retrieved successfully");
            return privateKey;
        }).catch((error) => {
            console.log("Error retrieving private key: " + error);
            return null;
        })
    )
}