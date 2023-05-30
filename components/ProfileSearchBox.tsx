import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import profileSearchBox from "../styles/profileSearchBox";
import { useMutation, useQuery } from "@apollo/client";
import { ACCEPT_FRIEND_REQUEST_QUERY, ADD_FRIEND_QUERY } from "../constants/graphql/mutations/addFriendQuery";
import React from "react";
import { ID } from "graphql-ws/lib/common";
import { GET_USER_PROFILE_IMG } from "../constants/graphql/querys/getProfileImg";
import { base64ToImage } from "../Functions/functions";
import { Swipeable } from "react-native-gesture-handler";
import stylesMsgBox from "../styles/stylesMsgBox";
import { REFUSE_FRIEND_REQUEST_QUERY } from "../constants/graphql/mutations/cancelFriendRequest";


const ProfileSearchBox = ({ username, friendRequestStatus, userId, removeFirendRequestParent }: any) => {

    let [submitFriendRequest, { loading, error, data }] = useMutation(ADD_FRIEND_QUERY);
    let [profilePic, setProfilePic] = React.useState(require("../assets/icons/profile.png"));
    //@ts-ignore
    const myId = global.LOGGED_IN_USER._id

    const addUser = async (userId: ID) => {
        console.log("Submitting Friend Request");

        try {
            await submitFriendRequest({ variables: { friendId: userId } })
        } catch (e) {
            console.log(e);
        }
    }

    let [acceptFriendRequest, {
        loading: loadingAcceptFR,
        error: errorAcceptFR,
        data: dataAcceptFR
    }] = useMutation(ACCEPT_FRIEND_REQUEST_QUERY);

    let [refuseFriendRequestMut, {
        loading: loadingRefuseRFR,
        error: errorRefuseRFR,
        data: dataRefuseRFR
    }] = useMutation(REFUSE_FRIEND_REQUEST_QUERY);

    const refuseFriendRequest = async (userId: ID) => {
        console.log("Refusing Friend Request");

        try {
            await refuseFriendRequestMut({ variables: { friendId: userId } })
        } catch (e) {
            console.log(e);
        }
        removeFirendRequestParent(userId);
    }

    const acceptRequest = async (userId: ID) => {
        console.log("Accepting Friend Request");

        try {
            await acceptFriendRequest({ variables: { friendId: userId } })
        } catch (e) {
            console.log(e);
        }

    }

    //Get the profileImageUri from the server
    const { loading: loadingProfileImage, error: errorProfileImage } = useQuery(GET_USER_PROFILE_IMG, {
        variables: { userId: userId },
        onCompleted: async (data) => {
            console.log("Load profile pic from server");
            let profilePicB64: string = data.getUserProfilePic;
            //check if has a profile pic
            if (profilePicB64) {
                console.log("Has profile pic");
                const imageURI = await base64ToImage(profilePicB64, 500);
                setProfilePic({ uri: imageURI });
            }
        }
    });

    const renderRightView = (): JSX.Element => {
        return (
            <TouchableOpacity onPress={() => refuseFriendRequest(userId)} style={stylesMsgBox.deleteButtonContainer}>
                <Text style={stylesMsgBox.deleteButtonText}>Remove</Text>
            </TouchableOpacity>)
    };



    return (
        <Swipeable
            friction={2}
            renderRightActions={() =>
                renderRightView()
            }>
            <View style={profileSearchBox.container}>
                <View style={profileSearchBox.pfPic}>
                    <Image style={profileSearchBox.pfPicImg} source={profilePic} />
                </View>
                <View style={profileSearchBox.pfNameContainer}>
                    <Text style={profileSearchBox.pfName}>{username}</Text>
                </View>
                <View style={profileSearchBox.pfAddContainer}>
                    <View style={profileSearchBox.pfAddButton}>

                        {loading && <ActivityIndicator size="small" color="#ffffff" />}
                        {error && <Text style={profileSearchBox.pfAddButtonText}>Error</Text>}
                        {data && <Text style={profileSearchBox.pfAddButtonText}>Added</Text>}
                        {friendRequestStatus.status !== 'Undefined'
                            && friendRequestStatus.status !== 'Accepted'
                            && friendRequestStatus.needToAcceptBy !== myId
                            && !data
                            && <Text style={profileSearchBox.pfAddButtonText}>{friendRequestStatus.status}</Text>}

                        {friendRequestStatus.status === 'Accepted' && <Image style={profileSearchBox.pfAddButtonImg}
                            source={require("../assets/icons/userAdded.png")} />}

                        {friendRequestStatus.status === 'Undefined' && !data &&
                            <TouchableOpacity onPress={() => addUser(userId)} style={profileSearchBox.pfAddButtonB}>
                                <Image style={profileSearchBox.pfAddButtonImg}
                                    source={require("../assets/icons/addUser.png")} />
                            </TouchableOpacity>}

                        {!dataAcceptFR && friendRequestStatus.needToAcceptBy === myId && !data &&
                            <>
                                <TouchableOpacity onPress={() => acceptRequest(userId)}
                                    style={profileSearchBox.pfAddButtonB}>
                                    <Text style={profileSearchBox.pfAddButtonText}>Accept</Text>
                                </TouchableOpacity>
                            </>}

                        {dataAcceptFR && <Text style={profileSearchBox.pfAddButtonText}>Accepted</Text>}

                    </View>
                </View>
            </View>
        </Swipeable>
    )
}

export default ProfileSearchBox;