import {ActivityIndicator, Text, TouchableHighlight, View} from "react-native";
import stylesChatSend from "../styles/chatSend";
import React from "react";


export function ChatSend({msg, date, loading}: { msg: string, date: string, loading: boolean }) {
    return (
        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={stylesChatSend.rightSide}>
            <View style={stylesChatSend.MsgBox}>
                <View style={stylesChatSend.textContent}>
                    <View style={stylesChatSend.textBubble}>
                        <Text style={stylesChatSend.textBubblePadding}>{msg} {loading &&
                            <ActivityIndicator size="small" color="#ffffff"/>}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}