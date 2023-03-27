import React, {useEffect, useState} from "react";
import {ActivityIndicator, Animated, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import {fadeInAnimation} from "../animations/fadeAnimation";
import {useNavigation} from "@react-navigation/native";

import {useLazyQuery} from '@apollo/client';
import {LOGIN_QUERY} from "../constants/graphql/querys/loginQuery";
import * as SecureStore from "expo-secure-store";
import {getPrivateKeyPerUser} from "../Functions/storePrivateKeyPerUser";

const LoginForm = ({setLogin, setPrivateKey}: any) => {
    let navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    let [submitLogin, {loading, error, data}] = useLazyQuery(LOGIN_QUERY, {
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            console.log("Login Successful");
            navigateToMainPage(data, setPrivateKey);
        }
    });

    const submitLoginFunction = async () => {
        console.log("Submitting Login");
        await submitLogin({variables: {username: username, password: password}})
    }

    const navigateToMainPage = async (data: any, setPrivateKey: any) => {
        let userId = data.login.user._id;

        //Check if user has a private key stored
        let success = await getPrivateKeyPerUser(userId)
        console.log("Private Key Found: " + success)

        //No private key found for user
        if (!success) {
            setPrivateKey(data.login);
            return
        }

        //add private key to global variable LOGGED_IN_USER
        data.login.user.privateKey = success;

        //@ts-ignore
        global.LOGGED_IN_USER = data.login.user

        //Convert data to string JSON
        data = JSON.stringify(data.login);
        await SecureStore.setItemAsync('authPayload', data)

        //@ts-ignore
        navigation.navigate("MainPage");
        return
    }

    const animationDuration = 200;
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));


    const [visible, setVisible] = useState(true);

    useEffect(() => fadeInAnimation(animationDuration, visible, fadeAnim), [visible]);

    const combinedFunction = (setLogin: any, setVisible: any) => {
        setTimeout(() => {
            setLogin(false);
        }, animationDuration);
        setVisible(!visible);
    }

    return (
        <View style={styles.inputBody}>
            <Animated.View style={{opacity: fadeAnim}}>
                {error && <Text style={styles.text}>{error.message}</Text>}
                <TextInput placeholder="Username" style={styles.input}
                           onChangeText={(username) => setUsername(username)}
                           value={username} placeholderTextColor={'#ffffff'}
                ></TextInput>
                <TextInput placeholder="Password" style={styles.input}
                           onChangeText={(password) => setPassword(password)}
                           value={password} placeholderTextColor={'#ffffff'} blurOnSubmit={true}
                ></TextInput>
                {loading && <ActivityIndicator size="large" color="#ffffff"/>}
                <TouchableOpacity onPress={() => submitLoginFunction()} style={styles.buttonsContainer}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => combinedFunction(setLogin, setVisible)}><Text style={styles.smallText}>Don't
                    have an account? Sign Up</Text></TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export default LoginForm;