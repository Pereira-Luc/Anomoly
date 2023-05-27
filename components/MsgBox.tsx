import {Image, Text, TouchableOpacity, View} from "react-native";
import stylesMsgBox from "../styles/stylesMsgBox";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import {base64ToImage} from "../Functions/functions";
import {useQuery} from "@apollo/client";
import {GET_USER_PROFILE_IMG} from "../constants/graphql/querys/getProfileImg";
import {encode as encodeBase64} from "@stablelib/base64";
//https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/swipeable/

// Maybe interesting for later: https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/drawer-layout

export function MsgBox({lastMsg, nameOfUser, date, chatId, userInfo, onDelete}: String | any) {
    let navigation = useNavigation();

    const [profilePic, setProfilePic] = useState<string>(encodeBase64(require('../assets/icons/profile.png')));


    const renderRightView = (): JSX.Element => {
        return (
            <TouchableOpacity onPress={onDelete} style={stylesMsgBox.deleteButtonContainer}>
                <Text style={stylesMsgBox.deleteButtonText}>Unfriend</Text>
            </TouchableOpacity>)
    };


    const openChat = (): void => {
        console.log("Open chat");
        //Navigate to MsgRoom
        // @ts-ignore
        navigation.navigate("MsgRoom", {
            chatRoomId: chatId,
            nameOfUser: nameOfUser,
            userInfo: userInfo,
            profileImageUri: profilePic
        });
    }


    //Get the profileImageUri from the server
    const {loading: loadingProfileImage, error: errorProfileImage} = useQuery(GET_USER_PROFILE_IMG, {
        variables: {userId: userInfo._id},
        onCompleted: async (data) => {

            let profilePicB64: string = data.getUserProfilePic;
            //check if has a profile pic
            if (profilePicB64) {
                console.log("User has Profile Pic");
                const imageURI = await base64ToImage(profilePicB64, 500);
                setProfilePic(imageURI);
            }
        }
    });


    return (
        <Swipeable
            friction={3}
            renderRightActions={() =>
                renderRightView()
            }>
            <TouchableOpacity style={stylesMsgBox.MsgBox} onPress={openChat}>
                <View style={stylesMsgBox.pfPic}>
                    {profilePic ? <Image style={stylesMsgBox.pfPicImg} source={{uri: profilePic}}/> :
                        <Image style={stylesMsgBox.pfPicImg} source={require('../assets/icons/profile.png')}/>}
                </View>
                <View>
                    <Text style={stylesMsgBox.nameOfUser}>{nameOfUser}</Text>
                    <View style={stylesMsgBox.lastMsgBox}>
                        <Text numberOfLines={1}
                              style={[stylesMsgBox.lastMsg, stylesMsgBox.lastMsgText]}>{lastMsg}</Text>
                        <Text style={[stylesMsgBox.lastMsg, stylesMsgBox.lastMsgDate]}>  {date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}