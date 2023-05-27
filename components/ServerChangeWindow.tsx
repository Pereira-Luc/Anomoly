import {TextInput, TouchableOpacity, View,Text} from "react-native";
import serverChange from "../styles/serverChange";
import React, {useEffect} from "react";
import {getServer, storeServer} from "../Functions/storeServer";
import RNRestart from 'react-native-restart';

export const ServerChangeWindow = () => {
    const [serverAddress, setServerAddress] = React.useState('');
    const [showServer, setShowServer] = React.useState('');

    const saveServerAddress = async () => {
        console.log(serverAddress)
        await storeServer(serverAddress)
        console.log("reloading")
        RNRestart.Restart();
        console.log("reloaded")
    }

    let currentServer = "http://localhost:4000/graphql"

    useEffect( () => {
        getServer().then(r => {
            setShowServer(r)
        })
    }, [])

    return (
        <View style={serverChange.container}>
            <View style={serverChange.serverChangeBox}>
                <View style={serverChange.serverChangeHeader}>
                    <Text style={serverChange.serverChangeTextHeader}>Change Server</Text>
                </View>
                <Text style={serverChange.serverChangeTextB}>Current Server: {showServer}</Text>
                <View style={serverChange.serverChangeBody}>
                    <Text style={serverChange.serverChangeText}>Server address</Text>
                    <TextInput style={serverChange.serverChangeInput} placeholder="http://localhost/graphql" onChangeText={(input) => setServerAddress(input)}></TextInput>
                    <TouchableOpacity style={serverChange.serverChangeButton} onPress={() => saveServerAddress()}>
                        <Text style={serverChange.serverChangeButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}