import {TouchableHighlight, View, Text} from "react-native";
import stylesChatSend from "../styles/chatSend";


export function ChatSend() {
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={stylesChatSend.rightSide}>
            <View style={stylesChatSend.MsgBox}>
                <View style={stylesChatSend.textContent}>
                    <View style={stylesChatSend.textBubble}>
                        <Text style={stylesChatSend.textBubblePadding}>t t t t t t t t t t t tt t t t t t tt t </Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}