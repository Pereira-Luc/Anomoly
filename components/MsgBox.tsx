import {TouchableHighlight, View, Text, Animated, PanResponder, TouchableOpacity, Dimensions} from "react-native";
import stylesMsgBox from "../styles/stylesMsgBox";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;

export function MsgBox({lastMsg, nameOfUser, date}) {
    const onDelete = () => {
        console.log("Delete");
    }

    const renderRightView = () => {
        return (
            <TouchableOpacity onPress={onDelete} style={stylesMsgBox.deleteButtonContainer}>
            <Text style={stylesMsgBox.deleteButtonText}>Delete</Text>
        </TouchableOpacity>)
    };

    return (
        <Swipeable
            renderRightActions={(progress, dragX) =>
                renderRightView()
            }>
            <TouchableOpacity style={stylesMsgBox.MsgBox} >
                <View style={stylesMsgBox.pfPic}></View>
                <View>
                    <Text style={stylesMsgBox.nameOfUser}>{nameOfUser}</Text>
                    <View style={stylesMsgBox.lastMsgBox}>
                        <Text style={stylesMsgBox.lastMsg}>{lastMsg}</Text>
                        <Text style={stylesMsgBox.lastMsg}> - {date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}