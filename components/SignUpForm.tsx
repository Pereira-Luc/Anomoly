import React, {useEffect} from "react";
import {Animated, LayoutAnimation, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import { useState } from 'react';
import {pressIn, pressOut} from "../animations/pressAnimation";
import {fadeInAnimation} from "../animations/fadeAnimation";


const SignUpForm = ({setLogin}) => {
    const submitSignUp = () => {
        console.log("SignUp Submitted");
        console.log(username);
        console.log(password)
        console.log(passwordConfirm)
    }

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
    const [visible, setVisible] = useState(true);

    const animationDuration = 200;

    useEffect(() => fadeInAnimation(animationDuration,visible,fadeAnim), [visible]);

    const combinedFunction = (setLogin, setVisible) => {
        setTimeout(() => {
            setLogin(true);
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
            <TextInput placeholder="Password Confirm" style={styles.input}
                       onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
                       value={passwordConfirm} placeholderTextColor={'#ffffff'} blurOnSubmit={true}
            ></TextInput>
            <TouchableOpacity onPressIn={() => pressIn()} onPressOut={() => pressOut()}  onPress={submitSignUp} style={styles.buttonsContainer}>
                <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressIn={() => pressIn()} onPressOut={() => pressOut()} onPress={() => combinedFunction(setLogin,setVisible)}>
                <Text style={styles.smallText}>Already have an account? Login</Text>
            </TouchableOpacity>
            </Animated.View>
        </View>
    );
}


export default SignUpForm;