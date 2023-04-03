import {Image, ImageBackground, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from "react-native";
import stylesMsgRoom from "../styles/msgRoom";
import {useNavigation} from "@react-navigation/native";
import {ChatReceive} from "../components/ChatReceive";
import {ChatSend} from "../components/ChatSend";
import {LOAD_CHATROOM_CONTENT} from "../constants/graphql/querys/loadChatRoomQuery";
import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {FlatList} from "react-native-gesture-handler";
import {CHAT_ROOM_SUB} from "../constants/graphql/querys/chatRoomSub";
import {SetStateAction, useEffect, useState} from "react";
import {SEND_MSG_MUT} from "../constants/graphql/querys/sendMsgMut";
import {box} from "tweetnacl";
import {getPrivateKeyPerUser} from "../Functions/storePrivateKeyPerUser";
import {decode as decodeBase64} from "@stablelib/base64";
import {decrypt, encrypt} from "../Functions/crypto";

export function MsgRoom({route}: any) {
    let navigation = useNavigation();

    const nameOfUser = route.params.nameOfUser;
    const chatRoomId = route.params.chatRoomId;
    const userInfos = route.params.userInfo
    const profileImageUri = route.params.profileImageUri;

    //If there is no profileImageUri, get it from server
    if (profileImageUri === null) {

    }


    let [combinedData, setCombinedData] = useState<any[]>([]);
    //message to send
    let [msg, setMsg] = useState("");
    let [encryptedMsg, setEncryptedMsg] = useState('');
    let [secretKey, setSecretKey] = useState(new Uint8Array(32));


    //Get chatRoomContent from API with chatRoomId Query= LOAD_CHATROOM_CONTENT
    const {loading, error} = useQuery(LOAD_CHATROOM_CONTENT, {
        variables: {chatId: chatRoomId},
        onCompleted: (data) => {
            //Set the data to the combined data
            setCombinedData(data.loadChatContent);
        },
    });

    //Subscribe to the chatRoomSub with chatRoomId
    const {data} = useSubscription(CHAT_ROOM_SUB, {
        variables: {chatId: chatRoomId},
        onData: (data) => {
            //If the data is not null, add the new message to the combinedData
            if (data.data.data.chatRoomContent !== null) {
                //Check if I am the sender of the message if so, do not add it to the combinedData
                if (data.data.data.chatRoomContent.receiverId === userInfos._id) {
                    return;
                }

                setCombinedData((combinedData) => [data.data.data.chatRoomContent, ...combinedData]);
            }
        }
    });

    // @ts-ignore
    useEffect(() => {
        async function fetchData() {
            // @ts-ignore
            const loggedInUserId = global.LOGGED_IN_USER._id;
            const publicKey: Uint8Array = decodeBase64(userInfos.publicKey);
            const privateKey: Uint8Array = decodeBase64(await getPrivateKeyPerUser(loggedInUserId) as string);

            const secretKey: Uint8Array = box.before(publicKey, privateKey);
            setSecretKey(secretKey);
        }

        fetchData();
    }, []);


    //Send message to the chatRoom
    const [sendMsg, {loading: loadingSend, error: errorSend, data: dataSend}] = useMutation(SEND_MSG_MUT, {
        variables: {chatId: chatRoomId, message: encryptedMsg, receiverId: userInfos._id},
    });

    const sendMsgToChatRoom = () => {

        //Encrypt the message with the secretKey
        const encryptedMessage = encrypt(secretKey, msg)

        sendMsg({
            variables: {chatId: chatRoomId, message: encryptedMessage, receiverId: userInfos._id}
        });

        //Create a chat message object
        let chatMessage = {
            message: msg,
            messageTime: new Date().toLocaleString(),
            receiverId: userInfos._id,
            // @ts-ignore
            senderId: global.LOGGED_IN_USER._id
        }

        setCombinedData((combinedData) => [chatMessage, ...combinedData]);
        //Clear the message input
        setMsg("");

    }

    let textInputProps = {
        placeholder: "Type a message",
        placeholderTextColor: "#fff",
        style: stylesMsgRoom.msgInput,
        onChangeText: (text: SetStateAction<string>) => setMsg(text),
        value: msg,
        width: msg.trim() !== "" ? "80%" : "100%",
    }


    const goBack = () => {
        // Go back to the previous page
        // Navigate to the MainPage Screen
        // @ts-ignore
        navigation.navigate('MainPage');
    }


    return (
        <View style={stylesMsgRoom.containerMain}>
            <KeyboardAvoidingView behavior="position">
                <View style={stylesMsgRoom.headerClear}></View>
                <ImageBackground source={require('../assets/img/BackGroundChatRoom7.png')}
                                 style={stylesMsgRoom.background}>
                    <FlatList
                        inverted={true}
                        data={combinedData}
                        renderItem={({item}) => {
                            let decryptedMessage = "";
                            try {
                                decryptedMessage = decrypt(secretKey, item.message)
                            } catch (e) {
                                decryptedMessage = item.message
                            }

                            if (item.receiverId === userInfos._id) {
                                //This means that the message was sent by me
                                //only send loading if the message is the last one
                                if (combinedData[0].message === item.message) {
                                    return <ChatSend msg={decryptedMessage} date={item.messageTime}
                                                     loading={loadingSend}/>
                                }

                                return <ChatSend msg={decryptedMessage} date={item.messageTime} loading={false}/>
                            } else {
                                //This means that the message was sent by the other user
                                return <ChatReceive msg={decryptedMessage} date={item.messageTime}/>
                            }
                        }}
                        keyboardDismissMode={"on-drag"}
                    >
                    </FlatList>
                    <View style={stylesMsgRoom.footerClear}></View>
                </ImageBackground>
                <View style={stylesMsgRoom.footer}>
                    <View style={stylesMsgRoom.container}>
                        <View style={stylesMsgRoom.msgInputContainer}>
                            <TextInput {...textInputProps}></TextInput>
                            {msg.trim() !== "" ?
                                <TouchableOpacity style={stylesMsgRoom.sendButton} onPress={() => sendMsgToChatRoom()}>
                                    <Image style={stylesMsgRoom.sendButtonImg}
                                           source={require("../assets/icons/send.png")}/>
                                </TouchableOpacity> : null}
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>

            {/* Preventing the header from moving up when the keyboard is open */}
            {/* that's why it's outside the KeyboardAvoidingView and underneath */}
            <View style={stylesMsgRoom.head}>
                <View style={stylesMsgRoom.container}>
                    <View style={stylesMsgRoom.spacer}></View>
                    <View style={stylesMsgRoom.header}>
                        <TouchableOpacity style={{justifyContent: "center"}} onPress={goBack}>
                            <Text style={[{marginRight: "5%"}, stylesMsgRoom.detailsText]}>Back</Text>
                        </TouchableOpacity>
                        <View style={stylesMsgRoom.nameOfUser}><Text
                            style={stylesMsgRoom.nameOfUserText}>{nameOfUser}</Text></View>
                        <View style={stylesMsgRoom.bubbleButtonRight}>
                            {profileImageUri ?
                                <Image style={stylesMsgRoom.profileImage} source={{uri: profileImageUri}}/> : null}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MsgRoom;