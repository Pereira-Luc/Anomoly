import {TextInput, TouchableOpacity, View,Text, Keyboard} from "react-native";
import serverChange from "../styles/serverChange";
import React, {useEffect, useMemo, useRef} from "react";
import {getServer, storeServer} from "../Functions/storeServer";
import RNRestart from 'react-native-restart';
import { Portal } from "react-native-portalize";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors } from "../styles/colors/colors";

export const ServerChangeWindow = ({closePopUp, showPopUp}) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['90%', '90%'], []);

    const [serverAddress, setServerAddress] = React.useState('');
    const [showServer, setShowServer] = React.useState('');


    const saveServerAddress = async () => {
        console.log(serverAddress)
        await storeServer(serverAddress)
        console.log("reloading")
        RNRestart.Restart();
        console.log("reloaded")
    }

    const resetAddress = async () => {
        await storeServer("https://graphql.anomoly.cloud/graphql")
        RNRestart.Restart();
    }

    const close = () => {
        closePopUp(false)
    }

    useEffect( () => {
        getServer().then(r => {
            setShowServer(r)
        })
    }, [])

    return (
    <Portal>
        <BottomSheet
            ref={bottomSheetRef}
            index={showPopUp ? 1 : -1}
            snapPoints={snapPoints}
            onChange={(index) => {
                closePopUp(index !== -1)
                // Close the keyboard if the bottom sheet is closed
                if (index === -1) Keyboard.dismiss()
            }}
            enablePanDownToClose={true}
            backgroundStyle={{backgroundColor: colors.primaryBackground}}
            handleIndicatorStyle={{backgroundColor: colors.primaryDetail}}
            style={serverChange.bottomSheetStyle}>
            <View style={serverChange.container}>
                <View style={serverChange.changeServerBox}>
                    <View style={serverChange.serverChangeBox}>
                        <View style={serverChange.serverChangeHeader}>
                            <Text style={serverChange.serverChangeTextHeader}>Change Server</Text>
                        </View>
                        <View style={serverChange.currenServerBox}>
                            <Text style={serverChange.serverChangeText}>Current Server</Text>
                            <Text style={serverChange.serverChangeTextB}>{showServer}</Text>
                        </View>
                        <View style={serverChange.serverChangeInputBox}>
                        <Text style={serverChange.serverChangeText}>Server address</Text>
                            <TextInput style={serverChange.serverChangeInput} placeholder="http://example.com/graphql" onChangeText={(input) => setServerAddress(input)}></TextInput>
                        </View>
                        <View style={serverChange.serverChangeBody}>
                            <TouchableOpacity style={serverChange.serverChangeButton} onPress={() => saveServerAddress()}>
                                <Text style={serverChange.serverChangeButtonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[serverChange.serverChangeButton, serverChange.serverChangeButtonReset]} onPress={() => resetAddress()}>
                                <Text style={serverChange.serverChangeButtonText}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </BottomSheet>
        </Portal>
    );
}