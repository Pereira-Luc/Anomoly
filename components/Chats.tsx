import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import {MsgBox} from "./MsgBox";
import ChatsSearchPopPage from "./ChatsSearchPopPage";
import React, {useState} from "react";
import {CHAT_FEED_QUERY} from "../constants/graphql/querys/chatFeedQuery";
import {useQuery} from "@apollo/client";
import {FlatList} from "react-native-gesture-handler";

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
    let {loading, error, data} = useQuery(CHAT_FEED_QUERY, {});


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
                    return <MsgBox lastMsg={item.lastMessage.message} nameOfUser={item.chatRoomName}
                                   date={"- " + getTimeFormat(item.lastMessage.messageTime)} chatId={item.chatId}/>
                }}
            >
                <View style={styles.footerClear}></View>
            </FlatList>
            <ChatsSearchPopPage visible={visible} setVisible={setVisible}/>
        </View>
    )
}

export default Chats;