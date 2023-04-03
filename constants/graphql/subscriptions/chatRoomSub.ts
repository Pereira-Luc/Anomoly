//Subscription for sending messages\
import {gql} from "@apollo/client";

export const CHAT_ROOM_SUB = gql`
    subscription sendMsg($chatId: ID!) {
        chatRoomContent(chatId: $chatId) {
            message
            senderId
            receiverId
            messageTime
        }
    }
`