import {Text, TouchableHighlight, View} from "react-native";
import stylesChatSend from "../styles/chatSend";


export function ChatSend({msg, date}: { msg: string, date: string }) {
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={stylesChatSend.rightSide}>
            <View style={stylesChatSend.MsgBox}>
                <View style={stylesChatSend.textContent}>
                    <View style={stylesChatSend.textBubble}>
                        <Text style={stylesChatSend.textBubblePadding}>{msg}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}