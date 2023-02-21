import {Dimensions, Platform} from "react-native";
import {StyleSheet} from "react-native";

const stylesMsgBox = StyleSheet.create({
    MsgBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1%',
        marginBottom: '1%',
        backgroundColor: '#008153',
        borderRadius: 10,
        padding: '3%',
        zIndex: 1,
        marginLeft: '2%',
        marginRight: '2%',
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
    },
    deleteButton: {
        width: '100%',
        height: '100%',
    },
    deleteButtonText: {
        color: '#ffffff',
        fontSize: (Platform.OS === 'ios') ? 20 : 16,
    },
    deleteButtonContainer: {
        margin: 0,
        alignContent: 'center',
        justifyContent: 'center',
        width: 70,
    }
})

export default stylesMsgBox;