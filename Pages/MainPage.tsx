import {Image, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import Chats from "../components/Chats";
import Groups from "../components/Groups";
import Settings from "../components/Settings";

import React, {useEffect} from "react";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import {Host} from "react-native-portalize";
import {useLazyQuery, useMutation} from "@apollo/client";
import {registerForPushNotificationsAsync} from "../Functions/sendPusNotification";
import {GET_PUSH_NOTIFICATION_TOKEN, SAVE_PUSH_NOTIFICATION_TOKEN} from "../constants/graphql/querys/pushNotification";

const MainPage = () => {
    //Default page is Chats
    const [page, setPage] = React.useState("Chats");

    //lazy query to send pushNotificationToken to server
    const [sendPushNotificationToken] = useMutation(SAVE_PUSH_NOTIFICATION_TOKEN, {
        onCompleted: (data) => {
            console.log(data);
        }
    });

    //TODO: Add a useEffect to check if the user is logged in, if not, redirect to the start page

    //TODO: Check if server already has my pushNotificationToken, if not, send it to the server
    const [checkPushNotificationToken, {error}] = useLazyQuery(GET_PUSH_NOTIFICATION_TOKEN, {
        onCompleted: async (data) => {
            console.log(data);
            //If not asked for permission, data is null
            if (!data.checkIfPushNotificationIsEnabled) {
                const pushNotificationToken = await registerForPushNotificationsAsync()
                sendPushNotificationToken({
                    variables: {token: pushNotificationToken}
                });
            }
        },
        fetchPolicy: "no-cache"
    });

    (useEffect(() => {
        const checkPushNotificationTokenAsync = async () => {
            console.log("checkPushNotificationTokenAsync");
            const token = await registerForPushNotificationsAsync()
            if (token) {
                checkPushNotificationToken();
                return
            }

            console.log("No Permission for Push Notifications");
        }

    }))

    return (
        <Host>
            <ActionSheetProvider>
                <View style={styles.mainContainer}>
                    {page === "Chats" ? <Chats/> : null}
                    {page === "Groups" ? <Groups/> : null}
                    {page === "Settings" ? <Settings/> : null}
                    <View style={styles.footer}>
                        <TouchableOpacity style={[styles.footerButton]}
                                          onPress={() => setPage("Groups")}>
                            <Image source={require('../assets/icons/group1.png')}
                                   style={[styles.footerImg, page === "Groups" && styles.footerImgActive]}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.chatsButtonFooter, styles.footerButton]}
                                          onPress={() => setPage("Chats")}>
                            <Image source={require('../assets/icons/chat1.png')}
                                   style={[styles.footerImg, page === "Chats" && styles.footerImgActive]}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.settingButtonFooter, styles.footerButton]}
                                          onPress={() => setPage("Settings")}>
                            <Image source={require('../assets/icons/setting3.png')}
                                   style={[styles.footerImg, page === "Settings" && styles.footerImgActive]}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </ActionSheetProvider>
        </Host>
    )
}

export default MainPage;