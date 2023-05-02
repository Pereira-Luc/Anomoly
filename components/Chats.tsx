import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import {MsgBox} from "./MsgBox";
import ChatsSearchPopPage from "./ChatsSearchPopPage";
import React, {useState} from "react";
import {CHAT_FEED_QUERY} from "../constants/graphql/querys/chatFeedQuery";
import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {FlatList} from "react-native-gesture-handler";
import {decode as decodeBase64} from "@stablelib/base64";
import {decrypt} from "../Functions/crypto";
import {box} from "tweetnacl";
import {CHAT_FEED_SUB} from "../constants/graphql/subscriptions/chatFeed";
import {getTimeFormat} from "../Functions/functions";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {ChatFeed} from "../interfaces/ChatFeed";
import {logout} from "../Functions/logout";
import {UNFRIEND} from "../constants/graphql/mutations/unFriend";

const Chats = () => {

    const [visible, setVisible] = useState(false);
    const [chatFeed, setChatFeed] = useState<ChatFeed[]>([]);

    let navigation = useNavigation();

    // GraphQL Mutation to unfriend a user
    const [unfriend] = useMutation(UNFRIEND, {
        onCompleted: (data) => {
            console.log("Unfriend Mutation: ", data);
        }
    });


    const onDelete = (chatId: number, friendId: number) => {
        console.log('Delete chat:', chatId);
        setChatFeed(chatFeed.filter((chat) => chat.chatId !== chatId));

        //Unfriend the user
        unfriend({variables: {userId: friendId}});
    };


    const getSortedChatFeed = (chatFeed: ChatFeed[]) => {
        return [...[...chatFeed].sort(
            (a, b) =>
                new Date(b.lastMessage.messageTime).getTime() -
                new Date(a.lastMessage.messageTime).getTime()
        )];
    };

    // @ts-ignore
    // Check if the users private key is set
    if (global.LOGGED_IN_USER.privateKey == null) {
        console.log("Missing Private Key")
        logout(navigation);
        return null
    }

    //Get Chat Feed from API CHAT_FEED_QUERY
    let {loading, error} = useQuery(CHAT_FEED_QUERY, {
        // Check if the data changed every 500ms
        onCompleted: (data) => {
            console.log("Query Data: ", data.loadAllChatFeed)
            setChatFeed(data.loadAllChatFeed);
        },
        fetchPolicy: "network-only"
    });

    // TODO: Check if the user is authenticated

    if (error) {
        //if error is AuthError, logout
        if (error.message === "You are not authenticated") {
            console.log("AuthError")
            //logout(navigation);
        }
    }

    //Subscribe to new messages
    const {error: subError, data: subData} = useSubscription(CHAT_FEED_SUB, {
        onData: (subscriptionData) => {
            // @ts-ignore
            console.log("Subscription Data ", subscriptionData.data.data.chatFeedContent, " Phone:", global.LOGGED_IN_USER.username)

            let chatFeedCopy = [...chatFeed];
            let chatId = subscriptionData.data.data.chatFeedContent.chatId;
            let lastMessage = subscriptionData.data.data.chatFeedContent.lastMessage;
            let lastMessageTime = subscriptionData.data.data.chatFeedContent.lastMessage.messageTime;

            // Find the chatRoomId in the chatFeed and update the lastMessage
            let chatRoomIndex = chatFeedCopy.findIndex(
                (chatRoom) => chatRoom.chatId === chatId
            );

            if (chatRoomIndex === -1) {
                console.log("ChatRoom not found add it to the chatFeed")
                // ChatRoom not found add it to the chatFeed
                chatFeedCopy.push(subscriptionData.data.data.chatFeedContent);
                setChatFeed(getSortedChatFeed(chatFeedCopy));
                return;
            }

            let chatFeedElement = chatFeedCopy[chatRoomIndex];

            chatFeedElement.lastMessage = lastMessage;
            chatFeedElement.lastMessage.messageTime = lastMessageTime;

            console.log("load chat")

            // Order the chatFeed by lastMessageTime
            setChatFeed(getSortedChatFeed(chatFeedCopy));
        }
    });

    if (subError) console.log("Subscription Error: ", subError)

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };
    useIsFocused();

    return (
        <View style={[styles.mainContainer]}>
            <View style={styles.head}>
                <View style={styles.spacer}></View>
                <View style={styles.header}>
                    <View style={styles.bubbleButtonRight}>
                        <TouchableOpacity>
                            <Text style={styles.bubbleButtonRightImg}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textH1Style}>Chats</Text>
                    <View style={styles.bubbleButtonLeft}>
                        <TouchableOpacity onPress={toggleBottomNavigationView}>
                            <Image source={require('../assets/icons/edit.png')}
                                   style={styles.bubbleButtonLeftImg}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.searchBox}>
                    <TextInput placeholderTextColor={"#a8a8a8"} placeholder="Search"
                               style={styles.searchInput}></TextInput>
                </View>
            </View>
            <FlatList
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                data={chatFeed}
                renderItem={({item}) => {

                    const publicKey: Uint8Array = decodeBase64(item.participants[0].publicKey)

                    // @ts-ignore
                    const privateKey: Uint8Array = decodeBase64(global.LOGGED_IN_USER.privateKey)
                    const secretSharedKey: Uint8Array = box.before(publicKey, privateKey);
                    let decryptedMessage: string = "";

                    try {
                        decryptedMessage = decrypt(secretSharedKey, item.lastMessage.message)
                    } catch (e) {
                        decryptedMessage = item.lastMessage.message
                    }

                    return <MsgBox onDelete={() => onDelete(item.chatId, item.participants[0]._id)}
                                   lastMsg={decryptedMessage} nameOfUser={item.chatRoomName}
                                   date={"- " + getTimeFormat(item.lastMessage.messageTime)} chatId={item.chatId}
                                   userInfo={item.participants[0]}/>
                }}
            >
                <View style={styles.footerClear}></View>
            </FlatList>
            {visible ? <ChatsSearchPopPage visible={visible} setVisible={setVisible}/> : null}
        </View>
    )
}

export default Chats;