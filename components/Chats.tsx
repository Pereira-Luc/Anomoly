import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import {MsgBox} from "./MsgBox";
import ChatsSearchPopPage from "./ChatsSearchPopPage";
import React, {useState} from "react";
import {CHAT_FEED_QUERY} from "../constants/graphql/querys/chatFeedQuery";
import {useQuery} from "@apollo/client";
import {FlatList} from "react-native-gesture-handler";
import {decode as decodeBase64} from "@stablelib/base64";
import {decrypt} from "../Functions/crypto";
import {box} from "tweetnacl";

const Chats = () => {

    const [visible, setVisible] = useState(false);
    //Format Date Show time up to 24 hours ago and show day if older than 24 hours
    const getTimeFormat = (date: Date) => {
        let d = new Date(date);
        let now = new Date();
        let diff = now.getTime() - d.getTime();
        let diffHours = Math.floor(diff / 1000 / 60 / 60);
        let diffDays = Math.floor(diff / 1000 / 60 / 60 / 24);
        if (diffHours < 24) {
            return diffHours + "h";
        }
        return diffDays + "d";
    }

    //Get Chat Feed from API CHAT_FEED_QUERY
    let {loading, error, data} = useQuery(CHAT_FEED_QUERY, {
        // Check if the data changed every 500ms
        //pollInterval: 2000,
    });


    const toggleBottomNavigationView = () => {
        console.log("Toggling Bottom Sheet");
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };

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
                data={data && data.loadAllChatFeed}
                renderItem={({item}) => {
                    const publicKey: Uint8Array = decodeBase64(item.participants[0].publicKey)
                    //Check if private key is null
                    // @ts-ignore
                    if (global.LOGGED_IN_USER.privateKey == null) {
                        return null
                    }

                    // @ts-ignore
                    const privateKey: Uint8Array = decodeBase64(global.LOGGED_IN_USER.privateKey)

                    const secretSharedKey = box.before(publicKey, privateKey);

                    let decryptedMessage = "";
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