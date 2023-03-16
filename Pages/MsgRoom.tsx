import {Image, ImageBackground, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from "react-native";
import stylesMsgRoom from "../styles/msgRoom";
import {useNavigation} from "@react-navigation/native";
import {ChatReceive} from "../components/ChatReceive";
import {ChatSend} from "../components/ChatSend";
import {LOAD_CHATROOM_CONTENT} from "../constants/graphql/querys/loadChatRoomQuery";
import {useQuery, useSubscription} from "@apollo/client";
import {FlatList} from "react-native-gesture-handler";
import {CHAT_ROOM_SUB} from "../constants/graphql/querys/chatRoomSub";
import {useState} from "react";

export function MsgRoom({route}: any) {
    let navigation = useNavigation();

    const nameOfUser = route.params.nameOfUser;
    const chatRoomId = route.params.chatRoomId;

    let [combinedData, setCombinedData] = useState<any[]>([]);


    //Get chatRoomContent from API with chatRoomId Query= LOAD_CHATROOM_CONTENT
    const {loading, error} = useQuery(LOAD_CHATROOM_CONTENT, {
        variables: {chatId: chatRoomId},
        onCompleted: (data) => {
            //Set the data to the combined data
            setCombinedData(data.loadChatContent);
        }
    });

    //Subscribe to the chatRoomSub with chatRoomId
    const {data} = useSubscription(CHAT_ROOM_SUB, {
        variables: {chatId: chatRoomId},
        onData: (data) => {
            //If the data is not null, add the new message to the combinedData
            console.log(data.data.data.chatRoomContent);
            if (data.data.data.chatRoomContent !== null) {
                setCombinedData((combinedData) => [data.data.data.chatRoomContent, ...combinedData]);
            }
        }
    });


    const goBack = () => {
        // Go back to the previous page
        // Navigate to the MainPage Screen
        // @ts-ignore
        navigation.navigate('MainPage');
    }


    return (

        <View style={stylesMsgRoom.containerMain}>
            <View style={stylesMsgRoom.head}></View>
            <View style={stylesMsgRoom.container}>
                <View style={stylesMsgRoom.spacer}></View>
                <View style={stylesMsgRoom.header}>
                    <TouchableOpacity style={{justifyContent: "center"}} onPress={goBack}>
                        <Text style={[{marginRight: "5%"}, stylesMsgRoom.detailsText]}>Back</Text>
                    </TouchableOpacity>
                    <View style={stylesMsgRoom.nameOfUser}><Text
                        style={stylesMsgRoom.nameOfUserText}>{nameOfUser}</Text></View>
                    <View style={stylesMsgRoom.bubbleButtonRight}></View>
                </View>
                <ImageBackground source={require('../assets/img/BackGroundChatRoom7.png')}
                                 style={stylesMsgRoom.background}>
                    <FlatList
                        inverted={true}
                        data={combinedData}
                        renderItem={({item}) => {
                            if (item.receiver === nameOfUser) {
                                //This means that the message was sent by me
                                return <ChatSend msg={item.message} date={item.messageTime}/>
                            } else {
                                //This means that the message was sent by the other user
                                return <ChatReceive msg={item.message} date={item.messageTime}/>
                            }
                        }}
                    >
                    </FlatList>
                    <View style={stylesMsgRoom.footerClear}></View>
                </ImageBackground>
            </View>
            <KeyboardAvoidingView behavior="position">
                <View style={stylesMsgRoom.footer}>
                    <View style={stylesMsgRoom.container}>
                        <View style={stylesMsgRoom.msgInputContainer}>
                            <TextInput style={stylesMsgRoom.msgInput}></TextInput>
                            <TouchableOpacity style={stylesMsgRoom.sendButton}>
                                <Image style={stylesMsgRoom.sendButtonImg}
                                       source={require("../assets/icons/send.png")}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default MsgRoom;