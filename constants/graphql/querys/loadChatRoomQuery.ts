import {gql} from "@apollo/client";

export const LOAD_CHATROOM_CONTENT = gql`
    query LoadChatRoomQuery($chatId: ID!) {
        loadChatContent(chatId: $chatId) {
            message
            sender
            receiver
            messageTime
        }
    }
`
