import {useState} from "react";
import {Animated} from "react-native";

const pressIn = (scaleAnim = new Animated.Value(1)) => {
    Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
    }).start();
};

const pressOut = (scaleAnim = new Animated.Value(1)) => {
    Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
    }).start();
};

export {pressIn, pressOut};