import {
    Image,
    NativeSyntheticEvent, RefreshControl,
    Text,
    TextInput,
    TextInputTextInputEventData,
    TouchableOpacity,
    View
} from "react-native";
import styles from "../styles/mainstyle";
import {MsgBox} from "./MsgBox";
import ChatsSearchPopPage from "./ChatsSearchPopPage";
import React, {useCallback, useEffect, useState} from "react";
import {CHAT_FEED_QUERY} from "../constants/graphql/querys/chatFeedQuery";
import {useLazyQuery, useMutation, useQuery, useSubscription} from "@apollo/client";
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
import {searchInChatFeed} from "../Functions/searchInChatFeed";

const Chats = ({show}) => {

    const [visible, setVisible] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState("");
    const [fullChatFeed, setFullChatFeed] = useState<ChatFeed[]>([]);
    const [chatFeed, setChatFeed] = useState<ChatFeed[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

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

    const search = async (text: NativeSyntheticEvent<TextInputTextInputEventData>) => {
        const input = text.nativeEvent.text;

        let searchResult = await searchInChatFeed(input, fullChatFeed);
        setChatFeed(searchResult)
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
    let [loadChatFeed, {error}] = useLazyQuery(CHAT_FEED_QUERY, {
        // Check if the data changed every 500ms
        onCompleted: (data) => {
            console.log("Query Data: ", data.loadAllChatFeed)
            setChatFeed(data.loadAllChatFeed);
            setFullChatFeed(data.loadAllChatFeed);
        },
        fetchPolicy: "network-only"
    });

    if (error) {
        //if error is AuthError, logout
        if (error.message === "You are not authenticated") {
            console.log("AuthError")
            logout(navigation);
        }
    }

    //Get Chat Feed from API CHAT_FEED_QUERY
    let { error: appError} = useQuery(CHAT_FEED_QUERY, {
        // Check if the data changed every 500ms
        onCompleted: (data) => {
            console.log("Query Data: ", data.loadAllChatFeed)
            setChatFeed(data.loadAllChatFeed);
            setFullChatFeed(data.loadAllChatFeed);
        },
    });


    if (appError) {
        //if error is AuthError, logout
        if (appError.message === "You are not authenticated") {
            console.log("AuthError")
            logout(navigation);
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
                setFullChatFeed(getSortedChatFeed(chatFeedCopy));
                return;
            }

            let chatFeedElement = chatFeedCopy[chatRoomIndex];

            chatFeedElement.lastMessage = lastMessage;
            chatFeedElement.lastMessage.messageTime = lastMessageTime;

            console.log("load chat")

            // Order the chatFeed by lastMessageTime
            setChatFeed(getSortedChatFeed(chatFeedCopy));
            setFullChatFeed(getSortedChatFeed(chatFeedCopy));
        }
    });
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        //Get Chat Feed from API CHAT_FEED_QUERY
        loadChatFeed().then(() => {
            setRefreshing(false);
        });
    }, []);


    if (subError) console.log("Subscription Error: ", subError)

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };

    useEffect(() => {
        // @ts-ignore
        setLoggedInUser(global.LOGGED_IN_USER.username)
        // @ts-ignore
        if (isFocused && loggedInUser !== global.LOGGED_IN_USER.username) {
            setChatFeed([])
            onRefresh();
        }

    }, [isFocused]);

    return (
        <View style={[styles.mainContainer , {display: show ? 'flex' : 'none'}]} >
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
                               style={styles.searchInput} onTextInput={(input) => search(input)}></TextInput>
                </View>
            </View>
            <FlatList
                refreshControl={  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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