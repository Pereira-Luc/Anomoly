import * as SecureStore from "expo-secure-store";


export const logout = (navigation: any) => {
    // clear the SecureStore of authPayload
    SecureStore.deleteItemAsync('authPayload').then(r => {
        //Go back to settings page
        // @ts-ignore
        navigation.navigate('StartPage');
    });
}