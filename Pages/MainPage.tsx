import {Button, Dimensions, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import styles from "../styles/mainstyle";

const MainPage = () => {
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

            </ScrollView>
            <View style={styles.footer}></View>
        </View >
    )
}

export default MainPage;