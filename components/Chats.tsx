import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import {MsgBox} from "./MsgBox";
import ChatsSearchPopPage from "./ChatsSearchPopPage";
import React, {useState} from "react";
import {CHAT_FEED_QUERY} from "../constants/graphql/querys/chatFeedQuery";
import {useQuery, useSubscription} from "@apollo/client";
import {FlatList} from "react-native-gesture-handler";
import {decode as decodeBase64} from "@stablelib/base64";
import {decrypt} from "../Functions/crypto";
import {box} from "tweetnacl";
import {CHAT_FEED_SUB} from "../constants/graphql/subscriptions/chatFeed";
import {getTimeFormat} from "../Functions/functions";
import {useIsFocused} from "@react-navigation/native";
import {ChatFeed} from "../interfaces/ChatFeed";

const Chats = () => {

    const [visible, setVisible] = useState(false);
    const [chatFeed, setChatFeed] = useState<ChatFeed[]>([]);

    const getSortedChatFeed = (chatFeed: ChatFeed[]) => {
        return [...[...chatFeed].sort(
            (a, b) =>
                new Date(b.lastMessage.messageTime).getTime() -
                new Date(a.lastMessage.messageTime).getTime()
        )];
    };


    //Get Chat Feed from API CHAT_FEED_QUERY
    let {loading, error} = useQuery(CHAT_FEED_QUERY, {
        // Check if the data changed every 500ms
        onCompleted: (data) => {
            console.log("Query Data: ", data.loadAllChatFeed)
            setChatFeed(data.loadAllChatFeed);
        },
        fetchPolicy: "network-only"
    });

    //Subscribe to new messages
    const {error: subError, data: subData} = useSubscription(CHAT_FEED_SUB, {
        onData: (subscriptionData) => {


            let chatFeedCopy = [...chatFeed];
            let chatId = subscriptionData.data.data.chatFeedContent.chatId;
            let lastMessage = subscriptionData.data.data.chatFeedContent.lastMessage;
            let lastMessageTime = subscriptionData.data.data.chatFeedContent.lastMessage.messageTime;

            // Find the chatRoomId in the chatFeed and update the lastMessage
            let chatRoomIndex = chatFeedCopy.findIndex(
                (chatRoom) => chatRoom.chatId === chatId
            );

            if (chatRoomIndex === -1) {
                return;
            }

            let chatFeedElement = chatFeedCopy[chatRoomIndex];

            chatFeedElement.lastMessage = lastMessage;
            chatFeedElement.lastMessage.messageTime = lastMessageTime;

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
                    //Check if private key is null
                    // @ts-ignore
                    if (global.LOGGED_IN_USER.privateKey == null) {
                        return null
                    }

                    // @ts-ignore
                    const privateKey: Uint8Array = decodeBase64(global.LOGGED_IN_USER.privateKey)

                    const secretSharedKey: Uint8Array = box.before(publicKey, privateKey);

                    let decryptedMessage: string = "";
                    try {
                        decryptedMessage = decrypt(secretSharedKey, item.lastMessage.message)
                    } catch (e) {
                        console.log("Error decrypting message: ", e)
                        decryptedMessage = item.lastMessage.message
                    }

                    return <MsgBox lastMsg={decryptedMessage} nameOfUser={item.chatRoomName}
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