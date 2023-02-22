import {TouchableHighlight, View, Text} from "react-native";
import stylesChatReceive from "../styles/chatReceive";


export function ChatReceive() {
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD">
            <View style={stylesChatReceive.MsgBox}>
                <View style={stylesChatReceive.textContent}>
                    <View style={stylesChatReceive.textBubble}>
                        <Text style={stylesChatReceive.textBubblePadding}>This Is a Test Of how Big it gets This Is a Test Of how Big it gets This Is a Test Of how Big it gets</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}