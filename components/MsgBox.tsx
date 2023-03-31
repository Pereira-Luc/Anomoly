import {Image, Text, TouchableOpacity, View} from "react-native";
import stylesMsgBox from "../styles/stylesMsgBox";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useNavigation} from "@react-navigation/native";
import {manipulateAsync, SaveFormat} from "expo-image-manipulator";
import {useEffect, useState} from "react";
//https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/swipeable/

// Maybe interesting for later: https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/drawer-layout

export function MsgBox({lastMsg, nameOfUser, date, chatId, userInfo}: String | any) {
    let navigation = useNavigation();

    const [profilePic, setProfilePic] = useState<string>('');

    const onDelete = () => {
        console.log("Delete");
    }

    const renderRightView = (): JSX.Element => {
        return (
            <TouchableOpacity onPress={onDelete} style={stylesMsgBox.deleteButtonContainer}>
                <Text style={stylesMsgBox.deleteButtonText}>Delete</Text>
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

        //get UserInfos
    }

    async function base64ToImage(base64String: string, width: number) {
        const {uri} = await manipulateAsync(
            `data:image/jpeg;base64,${base64String}`,
            [{resize: {width}}],
            {format: SaveFormat.JPEG, compress: 1}
        );

        return uri;
    }

    useEffect(() => {
        console.log("Get profile pic of user with id: " + userInfo.username + " should be nameOfUser " + nameOfUser);

        base64ToImage(userInfo.profilePic, 500).then((uri) => {
            setProfilePic(uri);
        }).catch((e) => {
            setProfilePic(require("../assets/icons/profile.png"));
        });
    }, []);

    return (
        <Swipeable
            friction={2}
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