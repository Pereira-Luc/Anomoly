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

    const width = Dimensions.get('window').width;


    /*const renderRightActions = (
        progress: Animated.AnimatedInterpolation,
        dragAnimatedValue: Animated.AnimatedInterpolation,
    ) => {

        //Create a slide animation for the delete button
        const slideAnimation = dragAnimatedValue.interpolate({
            inputRange: [0, 150],
            outputRange: [0, 10],
        });

        //Create a opacity animation for the delete button
        const opacityAnimation = dragAnimatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
        });
        return (
            <Animated.View  style={{transform: [{ translateX: slideAnimation }]}}>
                <TouchableOpacity style={stylesMsgBox.deleteButton} onPress={onDelete}>
                    <Text style={stylesMsgBox.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    };*/

    const renderRightActions = (progress, dragX, onClick) => {
        return (
            <TouchableOpacity onPress={onClick}
                style={{
                    margin: 0,
                    alignContent: 'center',
                    justifyContent: 'center',
                    width: 70,
                }}>
                <Text style={stylesMsgBox.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        );
    };

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