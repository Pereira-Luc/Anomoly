import {ChatMessage} from "./ChatMessage";
import {User} from "./User";

export interface ChatFeed {
    chatId: number
    chatRoomName: string
    lastMessage: ChatMessage
    participants: User[]
}