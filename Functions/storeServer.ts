import * as SecureStore from "expo-secure-store";

export const storeServer = async (server: string): Promise<boolean> => {
    return Promise.resolve(
        SecureStore.setItemAsync("serverAddress", server).then(() => {
            console.log("Server stored successfully");
            return true;
        }).catch((error) => {
            console.log("Error storing server: " + error);
            return false;
        })
    )
}

export const getServer = async (): Promise<string> => {
    return Promise.resolve(
        SecureStore.getItemAsync("serverAddress").then((server) => {
            console.log("Server retrieved successfully");
            if (server === null) { return "https://graphql.anomoly.cloud" }
            return server;
        }).catch((error) => {
            // Return default server if no server is stored
            return "https://graphql.anomoly.cloud"
        })
    )
}