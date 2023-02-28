import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import stylesMsgRoom from "../styles/msgRoom";
import {useNavigation} from "@react-navigation/native";
import {ChatReceive} from "../components/ChatReceive";
import {ChatSend} from "../components/ChatSend";

export function MsgRoom() {
    let navigation = useNavigation();
    const goBack = () => {
        // Go back to the previous page
        // Navigate to the MainPage Screen
        // @ts-ignore
        navigation.navigate('MainPage');
    }

    return (

        <View style={stylesMsgRoom.containerMain}>
            <View style={stylesMsgRoom.head}></View>
            <View style={stylesMsgRoom.container}>
                <View style={stylesMsgRoom.spacer}></View>
                <View style={stylesMsgRoom.header}>
                        <TouchableOpacity style={{ justifyContent: "center" }} onPress={goBack}>
                            <Text style={[{ marginRight: "5%" }, stylesMsgRoom.detailsText]}>Back</Text>
                        </TouchableOpacity>
                        <View style={stylesMsgRoom.nameOfUser}><Text style={stylesMsgRoom.nameOfUserText}>Name Of User</Text></View>
                        <View style={stylesMsgRoom.bubbleButtonRight}></View>
                </View>
                <ImageBackground source={require('../assets/img/BackGroundChatRoom7.png')} style={stylesMsgRoom.background}>
                    <ScrollView>
                        <ChatReceive/>
                        <ChatReceive/>
                        <ChatReceive/>
                        <ChatSend/>
                        <ChatReceive/>
                        <ChatSend/>

                    </ScrollView >
                </ImageBackground>
            </View>
            <KeyboardAvoidingView behavior="position">
                <View style={stylesMsgRoom.footer}>
                    <View style={stylesMsgRoom.container}>
                        <View style={stylesMsgRoom.msgInputContainer}>
                            <TextInput style={stylesMsgRoom.msgInput}></TextInput>
                            <View style={stylesMsgRoom.msgInputContainerCenter}>
                                <TouchableOpacity style={stylesMsgRoom.sendButton}>
                                    <Image style={stylesMsgRoom.sendButtonImg} source={require("../assets/icons/send.png")}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default MsgRoom;