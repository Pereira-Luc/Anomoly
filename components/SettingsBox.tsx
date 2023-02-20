import {Text, View} from "react-native";
import styles from "../styles/mainstyle";


const SettingsBox = () => {
    return (
       <View style={styles.settingBox}>
           <Text style={styles.textH2Style}>Setting</Text>
           <Text style={styles.textH3Style}>InfoSetting</Text>
       </View>
    )
}

export default SettingsBox;