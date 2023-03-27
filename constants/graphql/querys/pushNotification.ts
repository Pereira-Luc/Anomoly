import {gql} from "@apollo/client";

//Explain: https://www.youtube.com/watch?v=OLXw0X6dlnM
export const GET_PUSH_NOTIFICATION_TOKEN = gql`
    query getPushNotificationToken {
        checkIfPushNotificationIsEnabled
    }
`;

export const SAVE_PUSH_NOTIFICATION_TOKEN = gql`
    mutation savePushNotificationToken($token: String!) {
        savePushNotificationToken(token: $token)
    }
`;