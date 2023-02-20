import {Pressable, ScrollView, Text, TextInput, View} from "react-native";
import styles from "../styles/mainstyle";
import {MsgBox} from "./MsgBox";


const Chats = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.spacer}></View>
            <View style={styles.header}>
                <View style={styles.bubbleButtonRight}>
                    <Pressable ></Pressable>
                </View>
                <Text style={styles.textH1Style}>Chats</Text>
                <View style={styles.bubbleButtonLeft}>
                    <Pressable></Pressable>
                </View>
            </View>
            <View style={styles.searchBox}>
                <TextInput placeholder="Search"></TextInput>
            </View>
            <ScrollView>
                <MsgBox lastMsg="Test Length of message before breaking everything. Test Length of message before breaking everything. Test Length of message before breaking everything" nameOfUser="John" date="12:00" />
            </ScrollView>
        </View>
    )
}

export default Chats;