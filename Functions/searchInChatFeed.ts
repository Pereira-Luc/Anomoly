import {ChatFeed} from "../interfaces/ChatFeed";

export const searchInChatFeed = async (searchInput: string, chatFeedArray: ChatFeed[]): Promise<ChatFeed[]> => {
    let result: ChatFeed[] = [];
    chatFeedArray.forEach((chatFeed) => {
        if (chatFeed.chatRoomName.includes(searchInput)) {
            result.push(chatFeed);
        }
    })

    return result;
};