import {Dimensions, Platform} from "react-native";
import {StyleSheet} from "react-native";

const stylesMsgBox = StyleSheet.create({
    MsgBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '1%',
        marginBottom: '1%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        padding: '3%',
    },
    lastMsg: {
        color: '#ffffff',
        fontSize: (Platform.OS === 'ios') ? 15 : 12,
        maxWidth: Dimensions.get('window').width * 0.58,
        maxHeight: Dimensions.get('window').width * 0.08,
    },
    pfPic: {
        backgroundColor: '#ffffff',
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        borderRadius: 100,
        marginRight: '2%',
    },
    nameOfUser: {
        color: '#ffffff',
        fontSize: (Platform.OS === 'ios') ? 25 : 20,
    },
    lastMsgBox: {
        flexDirection: 'row',
    }
})

export default stylesMsgBox;