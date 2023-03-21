import {Dimensions, Platform, StyleSheet} from "react-native";
import {colors} from "./colors/colors";

const stylesMsgBox = StyleSheet.create({
    MsgBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        //borderColor: 'rgba(0,255,157,0.51)',
        borderBottomWidth: 0.5,
        marginLeft: '2%',
        marginRight: '2%',
        padding: '1%',
        backgroundColor: colors.secondaryBackground,
        borderRadius: 10,
        marginBottom: 5,
        //Shadow
        shadowColor: 'rgba(0,255,157,0.51)',
    },
    lastMsg: {
        color: '#9a9a9a',
        fontSize: (Platform.OS === 'ios') ? 15 : 12,
        maxWidth: Dimensions.get('window').width * 0.58,
        maxHeight: Dimensions.get('window').width * 0.08,
        // Make sure the text doesn't go to the next line but simply cut off
        overflow: 'hidden',

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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.7,
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
    },
    lastMsgDate: {
        color: '#9a9a9a',
        fontSize: (Platform.OS === 'ios') ? 15 : 12,
    },
    lastMsgText: {
        //Prevent the text from going to the next line
        flexShrink: 1,

    },
    pfPicImg: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        borderRadius: 100,
    }
})

export default stylesMsgBox;