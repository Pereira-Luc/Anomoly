import React, {useEffect, useState} from "react";
import {ActivityIndicator, Animated, Keyboard, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/mainstyle";
import {pressIn, pressOut} from "../animations/pressAnimation";
import {fadeInAnimation} from "../animations/fadeAnimation";
import {ApolloError, useMutation} from "@apollo/client";
import {SIGNUP_QUERY} from "../constants/graphql/mutations/signUpQuery";
import * as SecureStore from "expo-secure-store";

import {generateKeyPair} from "../Functions/crypto";
import {encode as encodeBase64} from "@stablelib/base64";
import {storePrivateKeyPerUser} from "../Functions/storePrivateKeyPerUser";

const SignUpForm = ({setLogin, setPrivateKey}: any) => {
    const [userKeyPair, setUserKeyPair] = useState(generateKeyPair());
    const publicKey = encodeBase64(userKeyPair.publicKey);

    let [submitLogin, {loading, error, data}] = useMutation(SIGNUP_QUERY, {
        onCompleted: (data) => {
            let userId = data.signUp.user._id;

            //Set Global username
            // @ts-ignore
            global.LOGGED_IN_USER = data.signUp.user

            //Add private key to global variable
            // @ts-ignore
            global.LOGGED_IN_USER.privateKey = encodeBase64(userKeyPair.secretKey);

            //Add private key to global variable
            data.signUp.user.privateKey = encodeBase64(userKeyPair.secretKey);

            data = JSON.stringify(data.signUp);

            //Store private key in secure store
            storePrivateKeyPerUser(userId, encodeBase64(userKeyPair.secretKey)).then(r => {
                console.log(r);
            })

            SecureStore.setItemAsync('authPayload', data).then(r => {
                //Show private key to user and ask them to save it
                //wait for animation to finish
                setTimeout(() => {
                    setPrivateKey(encodeBase64(userKeyPair.secretKey));
                }, animationDuration);
            });
        }
    });

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');

    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
    const [visible, setVisible] = useState(true);

    const animationDuration = 200;

    useEffect(() => fadeInAnimation(animationDuration, visible, fadeAnim), [visible]);

    const combinedFunction = (setLogin: any, setVisible: any) => {
        setTimeout(() => {
            setLogin(true);
        }, animationDuration);
        setVisible(!visible);
    }

    const submitSignUp = async () => {

        console.log("SignUp Submitted");
        Keyboard.dismiss();
        try {
            console.log("Signing Up");
            await submitLogin({
                variables: {
                    username: username,
                    password: password,
                    confirmPassword: passwordConfirm,
                    publicKey: publicKey
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    // Errors come in as an array of string and the decided by a comma for all errors
    // This function will split the string by the comma and return an array of strings
    const splitErrors = (errors: ApolloError) => {
        let errorString = errors.message;
        return errorString.split(',');
    }


    return (
        <View style={styles.inputBody}>
            <Animated.View style={{opacity: fadeAnim}}>
                {loading && <ActivityIndicator size="large" color="#ffffff"/>}
                {error ? (<View style={styles.errorBox}>
                    {splitErrors(error).map((errorMsg, index) => {
                        return <Text key={index} style={styles.errorText}>{errorMsg}</Text>
                    })
                    }
                </View>) : null}

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