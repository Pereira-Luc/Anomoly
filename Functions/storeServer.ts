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
            if (server === null) { return "http://192.168.178.125:4000/graphql" }
            return server;
        }).catch((error) => {
            // Return default server if no server is stored
            return "http://192.168.178.125:4000/graphql"
        })
    )
}