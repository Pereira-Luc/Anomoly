import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import SettingsBox from "./SettingsBox";


const Settings = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.spacer}></View>
            <View style={[styles.header, styles.centerTextHorizontal]}>
                <Text style={[styles.textH1Style]}>Settings</Text>
            </View>
            <View style={styles.profileImageEdit}>
                <TouchableOpacity style={styles.profileImage}>
                    <View style={styles.changeContainer}>
                        <Text style={styles.changeText}>Change</Text>
                    </View>
                </TouchableOpacity>
                <Text style={[styles.textH2Style,styles.marginTop5]}>Profile Name</Text>
            </View>
            <View style={styles.settingsContainer}>
                <SettingsBox />
            </View>

        </View>
    )
}

export default Settings;