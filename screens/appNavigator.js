import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StartPage from "../Pages/StartPage"
import MainPage from "../Pages/MainPage";
import MsgRoom from "../Pages/MsgRoom";

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer >
        <Navigator screenOptions={{
            headerShown: false
        }} initialRouteName="StartPage">
            <Screen name="StartPage" component={StartPage} />
            <Screen name="MainPage" component={MainPage} />
            <Screen name={"MsgRoom"} component={MsgRoom} />
        </Navigator>
    </NavigationContainer>
)
export default AppNavigator;