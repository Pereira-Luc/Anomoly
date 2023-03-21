import React from "react";
import {Image, KeyboardAvoidingView, Platform, Text} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import LoginForm from "../components/LoginForm";
import styles from "../styles/mainstyle";
import SignUpForm from "../components/SignUpForm";
import {CopyPrivateKeyPopUp} from "../components/CopyPrivatKeyPopUp";
import {MissingPrivateKeyPopUp} from "../components/MissingPrivateKeyPopUp";

const StartPage = () => {
    const [isLogin, setLogin] = React.useState(true);
    //If this is true, then the user successfully signed up and is now we show him his private key
    // for him to save it
    const [privateKey, setPrivateKey] = React.useState('');


    //setSignUp(decodedPublicKey);

    return (
        <LinearGradient style={styles.container} colors={['#000000', '#001115', '#001213', '#001c14']}>
            <Image source={require('../assets/img/Anomoly.png')} style={styles.imgLogo}></Image>
            <Text style={styles.heading1}>Anomoly</Text>
            {/* @ts-ignore */}
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "position" : null} keyboardVerticalOffset={10}>
                {isLogin && !privateKey ? <LoginForm setLogin={setLogin} setPrivateKey={setPrivateKey}/> : null}
                {!isLogin && !privateKey ? <SignUpForm setLogin={setLogin} setPrivateKey={setPrivateKey}/> : null}
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