import React, {useEffect, useState} from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import StartPage from "../Pages/StartPage"
import MainPage from "../Pages/MainPage";
import MsgRoom from "../Pages/MsgRoom";
import * as SecureStore from "expo-secure-store";

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {

    let [initialRouteName, setInitialRouteName] = useState("");

    //Check if user is logged in
    //Check if User is already logged in and navigate to main page
    useEffect(() => {
        SecureStore.getItemAsync('authPayload').then((authPayload) => {
            if (authPayload) {
                setInitialRouteName("MainPage");
                //reload the page
            } else {
                setInitialRouteName("StartPage");
            }
        });
    }, []);

    if (initialRouteName === "") {
        return null;
    } else {
        return (
            <NavigationContainer>
                <Navigator screenOptions={{
                    headerShown: false
                }} initialRouteName={initialRouteName}>
                    <Screen name="StartPage" component={StartPage}/>
                    <Screen name="MainPage" component={MainPage}/>
                    <Screen name="MsgRoom" component={MsgRoom}/>
                </Navigator>
            </NavigationContainer>
        )
    }
}
export default AppNavigator;