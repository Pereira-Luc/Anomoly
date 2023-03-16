import {gql} from "@apollo/client";

export const CHAT_FEED_QUERY = gql`
    query ChatFeedQuery {
        loadAllChatFeed {
            chatId
            chatRoomName
            lastMessage {
                message
                sender
                messageTime
                receiver
            }
        }
    }
`
