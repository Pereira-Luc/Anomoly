import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StartPage from "../Pages/StartPage"
import MainPage from "../Pages/MainPage";

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer >
        <Navigator screenOptions={{
            headerShown: false
        }} initialRouteName="StartPage">
            <Screen name="StartPage" component={StartPage} />
            <Screen name="MainPage" component={MainPage} />
        </Navigator>
    </NavigationContainer>
)



export default AppNavigator;