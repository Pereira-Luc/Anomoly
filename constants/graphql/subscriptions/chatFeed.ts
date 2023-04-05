import {gql} from "@apollo/client";


export const CHAT_FEED_SUB = gql`
    subscription chatFeedContent {
        chatFeedContent {
            chatId
            chatRoomName
            lastMessage{
                message
                messageTime
                senderId
                receiverId
            }
            participants{
                _id
                username
                publicKey
            }
        }
    }
`