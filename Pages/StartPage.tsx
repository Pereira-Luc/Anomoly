import React from "react";
import {Image, KeyboardAvoidingView, Platform, Text} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import LoginForm from "../components/LoginForm";
import styles from "../styles/mainstyle";
import SignUpForm from "../components/SignUpForm";

const StartPage = () => {
    const [isLogin, setLogin] = React.useState(true);


    return (
        <LinearGradient style={styles.container} colors={['#000000', '#001115', '#001213', '#001c14']}>
            <Image source={require('../assets/img/Anomoly.png')} style={styles.imgLogo}></Image>
            <Text style={styles.heading1}>Anomoly</Text>
            {/* @ts-ignore */}
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "position" : null} keyboardVerticalOffset={10}>
                {isLogin ? <LoginForm setLogin={setLogin}/> : <SignUpForm setLogin={setLogin}/>}
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}

export default StartPage;