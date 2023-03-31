import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import {Subscription} from "expo-modules-core";

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
            const {data} = response.notification.request.content;
            const userInfo = data.userInfo;
            const nameOfUser = data.nameOfUser;
            const profileImageUri = data.profileImageUri;
            const chatRoomId = data.chatRoomId;

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