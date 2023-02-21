import React, {useEffect} from "react";
import {Animated, LayoutAnimation, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import { useState } from 'react';
import {pressIn, pressOut} from "../animations/pressAnimation";
import {fadeInAnimation} from "../animations/fadeAnimation";
import {useNavigation} from "@react-navigation/native";


const LoginForm = ({setLogin}) => {
    let navigation = useNavigation();
    const submitLogin = () => {
        console.log("Login Submitted");
        console.log(username);
        console.log(password)

        // Navigate to the MainPage Screen
        // @ts-ignore
        navigation.navigate('MainPage');
    }

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const animationDuration = 200;

    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
    const [visible, setVisible] = useState(true);

    useEffect(() => fadeInAnimation(animationDuration,visible,fadeAnim), [visible]);

    const combinedFunction = (setLogin, setVisible) => {
        setTimeout(() => {
            setLogin(false);
        }, animationDuration);
        setVisible(!visible);
    }

    return (
        <View style={styles.inputBody}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <TextInput placeholder="Username" style={styles.input}
                           onChangeText={(username) => setUsername(username)}
                           value={username} placeholderTextColor={'#ffffff'}
                ></TextInput>
                <TextInput placeholder="Password" style={styles.input}
                           onChangeText={(password) => setPassword(password)}
                           value={password} placeholderTextColor={'#ffffff'} blurOnSubmit={true}
                ></TextInput>
                <TouchableOpacity onPressIn={() => pressIn()} onPressOut={() => pressOut()}  onPress={submitLogin} style={styles.buttonsContainer}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => pressIn()} onPressOut={() => pressOut()} onPress={() => combinedFunction(setLogin,setVisible)}><Text style={styles.smallText}>Don't have an account? Sign Up</Text></TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export default LoginForm;