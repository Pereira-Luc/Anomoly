import {ActivityIndicator, Image, Text, TouchableOpacity, View} from "react-native";
import profileSearchBox from "../styles/profileSearchBox";
import {useMutation} from "@apollo/client";
import {ACCEPT_FRIEND_REQUEST_QUERY, ADD_FRIEND_QUERY} from "../constants/graphql/mutations/addFriendQuery";
import React from "react";
import {ID} from "graphql-ws/lib/common";


const ProfileSearchBox = ({username, friendRequestStatus, userId}: any) => {

    let [submitFriendRequest, {loading, error, data}] = useMutation(ADD_FRIEND_QUERY);

    //@ts-ignore
    const myId = global.LOGGED_IN_USER._id

    const addUser = async (userId: ID) => {
        console.log("Submitting Friend Request");

        try {
            await submitFriendRequest({variables: {friendId: userId}})
        } catch (e) {
            console.log(e);
        }
    }

    let [acceptFriendRequest, {
        loading: loadingAcceptFR,
        error: errorAcceptFR,
        data: dataAcceptFR
    }] = useMutation(ACCEPT_FRIEND_REQUEST_QUERY);

    const acceptRequest = async (userId: ID) => {
        console.log("Accepting Friend Request");

        try {
            await acceptFriendRequest({variables: {friendId: userId}})
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
                        && friendRequestStatus.needToAcceptBy !== myId
                        && !data
                        && <Text style={profileSearchBox.pfAddButtonText}>{friendRequestStatus.status}</Text>}

                    {friendRequestStatus.status === 'Accepted' && <Image style={profileSearchBox.pfAddButtonImg}
                                                                         source={require("../assets/icons/userAdded.png")}/>}

                    {friendRequestStatus.status === 'Undefined' && !data &&
                        <TouchableOpacity onPress={() => addUser(userId)} style={profileSearchBox.pfAddButtonB}>
                            <Image style={profileSearchBox.pfAddButtonImg}
                                   source={require("../assets/icons/addUser.png")}/>
                        </TouchableOpacity>}

                    {!dataAcceptFR && friendRequestStatus.needToAcceptBy === myId && !data &&
                        <TouchableOpacity onPress={() => acceptRequest(userId)}
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