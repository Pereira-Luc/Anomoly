import {gql} from "@apollo/client";

export const SEND_MSG_MUT = gql`
    mutation sendMsg($message: String!, $receiverId: ID!, $chatId: ID!) {
        sendMsg(message: $message, receiverId: $receiverId, chatId: $chatId) {
            message
            senderId
            receiverId
            messageTime
        }
    }
`