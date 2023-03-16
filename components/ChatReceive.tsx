import {Text, TouchableHighlight, View} from "react-native";
import stylesChatReceive from "../styles/chatReceive";


export function ChatReceive({msg, date}: { msg: string, date: string }) {
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD">
            <View style={stylesChatReceive.MsgBox}>
                <View style={stylesChatReceive.textContent}>
                    <View style={stylesChatReceive.textBubble}>
                        <Text style={stylesChatReceive.textBubblePadding}>{msg}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}