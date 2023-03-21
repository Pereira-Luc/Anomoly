import {gql} from "@apollo/client";

export const SEND_MSG_MUT = gql`
    mutation sendMsg($message: String!, $receiver: String!, $chatId: ID!) {
        sendMsg(message: $message, receiver: $receiver, chatId: $chatId) {
            message
            sender
            receiver
            messageTime
        }
    }
`