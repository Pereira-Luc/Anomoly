import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import {MsgBox} from "./MsgBox";
import ChatsSearchPopPage from "./ChatsSearchPopPage";
import React, {useState} from "react";

const Chats = () => {

    const [visible, setVisible] = useState(false);

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
                    <TextInput placeholderTextColor={"#a8a8a8"} placeholder="Search" style={styles.searchInput}></TextInput>
                </View>
            </View>
            <ScrollView>
                <MsgBox lastMsg="Test Length of message" nameOfUser="John" date="12:00"/>
                <MsgBox
                    lastMsg="Test Length of message before breaking everything. Test Length of message before breaking everything. Test Length of message before breaking everything"
                    nameOfUser="John" date="12:00"/>
                <MsgBox
                    lastMsg="Test Length of message before breaking everything. Test Length of message before breaking everything. Test Length of message before breaking everything"
                    nameOfUser="John" date="12:00"/>
                <MsgBox lastMsg="Test Length of message" nameOfUser="John" date="12:00"/>
                <MsgBox lastMsg="Test Length of message" nameOfUser="John" date="12:00"/>
                <MsgBox lastMsg="Test Length of message" nameOfUser="John" date="12:00"/>
                <MsgBox lastMsg="Test Length of message" nameOfUser="John" date="12:00"/>
                <MsgBox lastMsg="Test Length of message" nameOfUser="John" date="12:00"/>
                <MsgBox lastMsg="Test Length of message" nameOfUser="John" date="12:00"/>
                <MsgBox lastMsg="Test Length of message" nameOfUser="John" date="12:00"/>
                <MsgBox lastMsg="Test Length of message" nameOfUser="John" date="12:00"/>
                <MsgBox lastMsg="Test Length of message" nameOfUser="John" date="12:00"/>
                <View style={styles.footerClear}></View>
            </ScrollView>
            <ChatsSearchPopPage visible={visible} setVisible={setVisible}/>
        </View>
    )
}

export default Chats;