import React from "react";
import {
    Text,
    KeyboardAvoidingView,
    Image,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginForm from "../components/LoginForm";
import styles from "../styles/mainstyle";
import SignUpForm from "../components/SignUpForm";
const StartPage = () => {
    const [isLogin, setLogin] = React.useState(true);

    return (
        <LinearGradient style={styles.container} colors={['#070d28', '#16002a','#200026','#1c0009']}>
            <Image source={require('../assets/img/Anomoly.png')} style={styles.imgLogo}></Image>
            <Text style={styles.heading1} >Anomoly</Text>
            <KeyboardAvoidingView behavior={(Platform.OS === 'ios')? "position" : null} keyboardVerticalOffset={10} >
                {isLogin ? <LoginForm setLogin={setLogin} /> : <SignUpForm setLogin={setLogin} />}
            </KeyboardAvoidingView>
        </LinearGradient >
    )
}

export default StartPage;