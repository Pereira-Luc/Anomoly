import {
    Animated,
    Button,
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles from "../styles/mainstyle";
import {LinearGradient} from "expo-linear-gradient";
import Chats from "../components/Chats";
import Groups from "../components/Groups";
import Settings from "../components/Settings";

import React, {useState} from "react";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";

const MainPage = () => {
    //Default page is Chats
    const [page, setPage] = React.useState("Chats");

    return (
        <ActionSheetProvider>
            <View style={styles.mainContainer}>
                {page === "Chats" ? <Chats /> : null}
                {page === "Groups" ? <Groups /> : null}
                {page === "Settings" ? <Settings /> : null}
                <View style={styles.footer}>
                    <TouchableOpacity style={[styles.groupsButtonFooter, styles.footerButton]} onPress={() => setPage("Groups")}>
                        <Image source={require('../assets/icons/group1.png')} style={[styles.footerImg,  page === "Groups" && styles.footerImgActive]}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.chatsButtonFooter, styles.footerButton]} onPress={() => setPage("Chats")}>
                        <Image source={require('../assets/icons/chat1.png')} style={[styles.footerImg,  page === "Chats" && styles.footerImgActive]}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingButtonFooter, styles.footerButton]} onPress={() => setPage("Settings")}>
                        <Image source={require('../assets/icons/setting3.png')} style={[styles.footerImg, page === "Settings" && styles.footerImgActive]}></Image>
                    </TouchableOpacity>
                </View>
            </View >
        </ActionSheetProvider>
    )
}

export default MainPage;