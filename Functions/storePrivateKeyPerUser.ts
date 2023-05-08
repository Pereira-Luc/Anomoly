//This function stores the private key for a user in the secure storage of the device
import * as SecureStore from "expo-secure-store";

export const storePrivateKeyPerUser = async (userId: string, privateKey: string): Promise<boolean> => {
    return Promise.resolve(
        SecureStore.setItemAsync(userId + "_privateKey", privateKey).then(() => {
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
    return Promise.resolve(
        SecureStore.getItemAsync(userId + "_privateKey").then((privateKey) => {
            console.log("Private key retrieved successfully");
            return privateKey;
        }).catch((error) => {
            console.log("Error retrieving private key: " + error);
            return null;
        })
    )
}