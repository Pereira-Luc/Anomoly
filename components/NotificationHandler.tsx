import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import {Subscription} from "expo-modules-core";
import {NotificationChatData} from "../interfaces/NotificationChatData";

const NotificationHandler = () => {
    const navigation = useNavigation();
    const notificationListener = useRef<Subscription | null>(null);
    const responseListener = useRef<Subscription | null>(null);

    useEffect(() => {
        console.log('Notification listener added');

        notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
            // Handle foreground notifications (if needed)
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(async (response) => {
            // Get data from notification and navigate to the correct screen
            const {data} = response.notification.request.content.data;

            let notificationChatData: NotificationChatData | null = null;
            //convert data into NotificationChatData

            console.log('Notification received: ', typeof data);

            notificationChatData = data as NotificationChatData;

            if (!notificationChatData) {
                return
            }

            const userInfo = notificationChatData.userInfo;
            const nameOfUser = notificationChatData.nameOfUser;
            const profileImageUri = userInfo.profilePicture;
            const chatRoomId = notificationChatData.chatRoomId;

            console.log('Notification received: ', data);

            // Navigate to MsgRoom.tsx
            // @ts-ignore
            navigation.navigate('MsgRoom', {
                chatRoomId: chatRoomId,
                nameOfUser: nameOfUser,
                profileImageUri: profileImageUri,
                userInfo: userInfo,
            });
        });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current)
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current)
            }
        };
    }, []);

    return null;
};

export default NotificationHandler;