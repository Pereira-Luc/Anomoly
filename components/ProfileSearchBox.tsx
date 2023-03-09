import {ActivityIndicator, Image, Text, TouchableOpacity, View} from "react-native";
import profileSearchBox from "../styles/profileSearchBox";
import {useMutation} from "@apollo/client";
import {ACCEPT_FRIEND_REQUEST_QUERY, ADD_FRIEND_QUERY} from "../constants/graphql/querys/addFriendQuery";
import React, {useState} from "react";
import * as SecureStore from "expo-secure-store";
import {AuthPayload} from "../interfaces/AuthPayload";

const ProfileSearchBox = ({username, friendRequestStatus}: any) => {

    let [submitFriendRequest, {loading, error, data}] = useMutation(ADD_FRIEND_QUERY);
    const [myUsername, setUsername] = useState('');

    const addUser = async (username: String) => {
        console.log("Submitting Friend Request");
        try {
            await submitFriendRequest({variables: {friendUsername: username}})
        } catch (e) {
            console.log(e);
        }
    }

    //Get my username from secure store
    (async () => {
        //Get authPayload from local storage
        let authPayload = await SecureStore.getItemAsync('authPayload');
        // Convert the Json string to a Json object
        if (authPayload === null) {
            return
        }
        const authPayloadObject: AuthPayload = JSON.parse(authPayload);
        setUsername(authPayloadObject.login.user.username);
    })();

    let [acceptFriendRequest, {
        loading: loadingAcceptFR,
        error: errorAcceptFR,
        data: dataAcceptFR
    }] = useMutation(ACCEPT_FRIEND_REQUEST_QUERY);

    const acceptRequest = async (username: String) => {
        console.log("Accepting Friend Request");

        try {
            await acceptFriendRequest({variables: {friendUsername: username}})
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={profileSearchBox.container}>
            <View style={profileSearchBox.pfPic}>
                <Image style={profileSearchBox.pfPicImg} source={require("../assets/icons/profile.png")}/>
            </View>
            <View style={profileSearchBox.pfNameContainer}>
                <Text style={profileSearchBox.pfName}>{username}</Text>
            </View>
            <View style={profileSearchBox.pfAddContainer}>
                <View style={profileSearchBox.pfAddButton}>

                    {loading && <ActivityIndicator size="small" color="#ffffff"/>}
                    {error && <Text style={profileSearchBox.pfAddButtonText}>Error</Text>}
                    {data && <Text style={profileSearchBox.pfAddButtonText}>Added</Text>}
                    {friendRequestStatus.status !== 'Undefined'
                        && friendRequestStatus.status !== 'Accepted'
                        && friendRequestStatus.needToAcceptBy !== myUsername
                        && !data
                        && <Text style={profileSearchBox.pfAddButtonText}>{friendRequestStatus.status}</Text>}

                    {friendRequestStatus.status === 'Accepted' && <Image style={profileSearchBox.pfAddButtonImg}
                                                                         source={require("../assets/icons/userAdded.png")}/>}

                    {friendRequestStatus.status === 'Undefined' && !data &&
                        <TouchableOpacity onPress={() => addUser(username)} style={profileSearchBox.pfAddButtonB}>
                            <Image style={profileSearchBox.pfAddButtonImg}
                                   source={require("../assets/icons/addUser.png")}/>
                        </TouchableOpacity>}

                    {!dataAcceptFR && friendRequestStatus.needToAcceptBy === myUsername && !data &&
                        <TouchableOpacity onPress={() => acceptRequest(username)}
                                          style={profileSearchBox.pfAddButtonB}>
                            <Text style={profileSearchBox.pfAddButtonText}>ACCEPT</Text>
                        </TouchableOpacity>}

                    {dataAcceptFR && <Text style={profileSearchBox.pfAddButtonText}>Accepted</Text>}

                </View>
            </View>
        </View>
    )
}

export default ProfileSearchBox;