import {Image, Text, TouchableOpacity, View} from "react-native";
import stylesMsgBox from "../styles/stylesMsgBox";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useNavigation} from "@react-navigation/native";

export function MsgBox({lastMsg, nameOfUser, date}: any) {
    let navigation = useNavigation();
    const onDelete = () => {
        console.log("Delete");
    }

    const renderRightView = () => {
        return (
            <TouchableOpacity onPress={onDelete} style={stylesMsgBox.deleteButtonContainer}>
                <Text style={stylesMsgBox.deleteButtonText}>Delete</Text>
            </TouchableOpacity>)
    };

    const openChat = () => {
        console.log("Open chat");
        //Navigate to MsgRoom
        // @ts-ignore
        navigation.navigate("MsgRoom");
    }

    return (
        <Swipeable
            renderRightActions={() =>
                renderRightView()
            }>
            <TouchableOpacity style={stylesMsgBox.MsgBox} onPress={openChat}>
                <View style={stylesMsgBox.pfPic}>
                    <Image style={stylesMsgBox.pfPicImg} source={require("../assets/icons/profile.png")}/>
                </View>
                <View>
                    <Text style={stylesMsgBox.nameOfUser}>{nameOfUser}</Text>
                    <View style={stylesMsgBox.lastMsgBox}>
                        <Text numberOfLines={1}
                              style={[stylesMsgBox.lastMsg, stylesMsgBox.lastMsgText]}>{lastMsg}</Text>
                        <Text style={[stylesMsgBox.lastMsg, stylesMsgBox.lastMsgDate]}>  {date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}