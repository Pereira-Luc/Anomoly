import styles from "../styles/mainstyle";
import {Animated, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import * as Clipboard from "expo-clipboard";
import {fadeInAnimation} from "../animations/fadeAnimation";
import {useNavigation} from "@react-navigation/native";

export const CopyPrivateKeyPopUp = ({privateKey, setPrivateKey}: any) => {
    const [isCopied, setCopied] = React.useState(false);
    const navigation = useNavigation();
    const copyToClipboard = () => {
        Clipboard.setStringAsync((privateKey)).then(r => {
            //show small popup that says "copied to clipboard"
            setCopied(true);
        })
    }

    //Animation
    const animationDuration = 200;
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
    const [visible, setVisible] = useState(true);
    useEffect(() => fadeInAnimation(animationDuration, visible, fadeAnim), [visible]);

    //Navigation to MainPage
    const nextScreen = () => {
        setPrivateKey(null);
        // @ts-ignore
        navigation.navigate('MainPage');
    }

    //Format the key format: FFFF FFFF FFFF FFFF
    const formatKey = (key: string) => {
        let formattedKey = "";
        for (let i = 0; i < key.length; i++) {
            if (i % 4 === 0) {
                formattedKey += " ";
            }
            formattedKey += key[i];
        }
        return formattedKey;
    }

    return (
        <Animated.View style={[{opacity: fadeAnim}, styles.privateKeyBox]}>
            <View style={styles.privateKeyBoxHeader}>
                <Text style={styles.privateKeyBoxHeaderTitle}> Secret key:{"\n"} Please save it somewhere safe
                    !!!</Text>
            </View>
            <View style={styles.privateKeyBoxBody}>
                <TouchableOpacity onPress={() => copyToClipboard()}>
                    <View pointerEvents='none'>
                        <TextInput multiline={true} editable={false} autoCorrect={false} style={styles.privateKeyText}>
                            {formatKey(privateKey)}
                        </TextInput>
                    </View>
                </TouchableOpacity>
                {isCopied && <Text style={styles.privateKeyCopyInfo}>Copied to clipboard!</Text>}
                <Text style={styles.text}>
                    You will need it on first login on new devices!
                    If you lose it, you will not be able to access your account and we will not be able to help you.
                </Text>
            </View>

            <View>
                <TouchableOpacity style={styles.privateKeyBoxButton} onPress={() => nextScreen()}>
                    <Text style={styles.privateKeyBoxButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
};