import AppNavigator from "./screens/appNavigator";
import {useFonts} from 'expo-font';
import {ApolloProvider} from '@apollo/client';
import {getApolloClient} from './constants/graphql/clients';
import * as Notifications from "expo-notifications";
import {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';


//Notification handler
Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        };
    },
})


export default function App() {
    const [client, setClient] = useState(null);

    const [loaded] = useFonts({
        'LogoFont': require('./assets/fonts/DancingScript.ttf'),
    });

    useEffect(() => {
        getApolloClient().then((client) => {
            client.resetStore().then(r => console.log("reset store "));
            setClient(client);
        });
    }, []);


    if (!loaded || !client) {
    console.log("fonts not loaded");
    return null;
  }else{
    console.log("fonts loaded");
    return (
        <ApolloProvider client={client}>
            <StatusBar style="auto"/>
          <AppNavigator/>
        </ApolloProvider>
    );
  }
}