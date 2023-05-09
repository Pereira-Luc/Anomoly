import React from "react";
import {Image, KeyboardAvoidingView, Platform, Text} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import LoginForm from "../components/LoginForm";
import styles from "../styles/mainstyle";
import SignUpForm from "../components/SignUpForm";
import {CopyPrivateKeyPopUp} from "../components/CopyPrivatKeyPopUp";
import {MissingPrivateKeyPopUp} from "../components/MissingPrivateKeyPopUp";
import {colors} from "../styles/colors/colors";

const StartPage = () => {
    const [isLogin, setLogin] = React.useState(true);
    //If this is true, then the user successfully signed up and is now we show him his private key
    // for him to save it
    const [privateKey, setPrivateKey] = React.useState('');


    return (
        <LinearGradient style={styles.container} colors={[colors.primaryBackgroundVeryDark, colors.primaryBackgroundDark, colors.primaryBackground, colors.primaryForeground]}>
            <Image source={require('../assets/img/Anomoly2.png')} style={styles.imgLogo}></Image>
            <Text style={styles.heading1}>Anomoly</Text>
            {/* @ts-ignore */}
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "position" : null} keyboardVerticalOffset={10}>
                {isLogin && !privateKey ? <LoginForm setLogin={setLogin} setPrivateKey={setPrivateKey}/> : null}
                {!isLogin && !privateKey ? <SignUpForm setLogin={setLogin} setPrivateKey={setPrivateKey} /> : null}
                {/*Box to show Private key and save it if set*/}
                {privateKey && !isLogin ?
                    <CopyPrivateKeyPopUp privateKey={privateKey} setPrivateKey={setPrivateKey}/> : null}
                {privateKey && isLogin ?
                    <MissingPrivateKeyPopUp data={privateKey} setPrivateKey={setPrivateKey}/> : null}
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}

export default StartPage;