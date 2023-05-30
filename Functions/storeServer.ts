import * as SecureStore from "expo-secure-store";

const defaultServer = 'https://graphql.anomoly.cloud/graphql'


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
            //@ts-ignore
            if (server === null) { return defaultServer }
            return server;
        }).catch((error) => {
            //@ts-ignore Return default server if no server is stored 
            return defaultServer;
        })
    )
}