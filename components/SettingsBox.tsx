import {Text, TouchableOpacity} from "react-native";
import styles from "../styles/mainstyle";


const SettingsBox = ({onPressFunction, settingName, settingInfo}: any) => {
    return (
        <TouchableOpacity style={styles.settingBox} onPress={() => onPressFunction()}>
            <Text style={styles.textH2Style}>{settingName}</Text>
            <Text style={styles.textH3Style}>{settingInfo}</Text>
        </TouchableOpacity>
    )
}

export default SettingsBox;