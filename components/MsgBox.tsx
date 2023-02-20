import {TouchableHighlight, View, Text} from "react-native";
import stylesMsgBox from "../styles/stylesMsgBox";

export function MsgBox({lastMsg, nameOfUser, date}) {
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD">
            <View style={stylesMsgBox.MsgBox}>
                <View style={stylesMsgBox.pfPic}></View>
                <View>
                    <Text style={stylesMsgBox.nameOfUser}>{nameOfUser}</Text>
                    <View style={stylesMsgBox.lastMsgBox}>
                        <Text style={stylesMsgBox.lastMsg}>{lastMsg}</Text>
                        <Text style={stylesMsgBox.lastMsg}> - {date}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}