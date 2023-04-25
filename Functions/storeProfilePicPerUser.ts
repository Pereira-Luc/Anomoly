import * as SecureStore from "expo-secure-store";

export const storeProfilePicPerUser = async (userId: string, profilePic: string): Promise<boolean> => {
    return Promise.resolve(
        SecureStore.setItemAsync(userId + "_profilePic", profilePic).then(() => {
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
    return Promise.resolve(
        SecureStore.getItemAsync(userId + "_profilePic").then((profilePic) => {
            console.log("ProfilePic retrieved successfully");
            return profilePic;
        }).catch((error) => {
            console.log("Error retrieving private key: " + error);
            return null;
        })
    )
}