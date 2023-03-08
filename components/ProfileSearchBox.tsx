import {Image, Text, TouchableOpacity, View} from "react-native";
import profileSearchBox from "../styles/profileSearchBox";

const ProfileSearchBox = ({userID, username}: any) => {

    const addUser = (userID: any) => {
        console.log("Add user With ID: " + userID);
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
                <TouchableOpacity style={profileSearchBox.pfAddButton} onPress={() => addUser(userID)}>
                    <Image style={profileSearchBox.pfAddButtonImg} source={require("../assets/icons/addUser.png")}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileSearchBox;