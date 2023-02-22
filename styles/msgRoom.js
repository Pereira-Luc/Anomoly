import {Dimensions} from "react-native";
import {StyleSheet} from "react-native";

const stylesMsgRoom = StyleSheet.create({
    MsgBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '1%',
        marginBottom: '1%',

    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#151515',
        paddingBottom: '2%',
    },
    spacer: {
        top: '0%',
        padding: '6%',
    },
    bubbleButtonRight: {
        right: '5%',
        marginLeft: '5%',
        display: 'flex',
        top: '0%',
        backgroundColor: '#e52929',
        width: Dimensions.get('window').width * 0.10,
        height: Dimensions.get('window').width * 0.10,
        borderRadius: 100,
    }, leftSideHeader: {
        display: 'flex',
        flexDirection: 'row',
    }, centerAlignText: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    containerMain: {
        display: 'flex',
        backgroundColor: '#151515',
    }, head: {
        position: 'absolute',
        width: '100%',
        height: Dimensions.get('window').height * 0.11,
        backgroundColor: '#151515',
    }, footer: {
        backgroundColor: '#151515',
        width: '100%',
        height: Dimensions.get('window').height * 0.1,
    }, msgInput: {
        backgroundColor: '#232323',
        width: '75%',
        borderRadius: 15,
        marginTop: '3%',
        marginLeft: '3%',
        borderColor: 'rgba(0,255,157,0.32)',
        borderWidth: 1,

    },sendButton: {
        backgroundColor: '#3f3f3f',
        width: 50,
        height: 30,
        borderRadius: 15,
        //Center the text
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        marginLeft: '3%',

    }
    , container: {
        display: 'flex',
        marginLeft: '5%',
        marginRight: '5%',
    }, msgInputContainer: {
        display: 'flex',
        flexDirection: 'row',
    }, msgInputContainerCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        borderRadius: 15,
        marginLeft: '3%',
    },background: {
        width: Dimensions.get('window').width * 1.1,
        height: Dimensions.get('window').height * 0.8,
        left: -Dimensions.get('window').width * 0.08,
        tintColor: '#111111',
        backgroundColor: '#000000',
    },
    sendButtonImg: {
        width: 20,
        height: 20,
        tintColor: '#00ff9d',
    },nameOfUser: {
        justifyContent: "center",
        color: '#ffffff',
    },
    nameOfUserText: {
        color: '#ffffff',
        fontSize: 20,
    },detailsText: {
        color: '#00ff9d',
        fontSize: (Platform.OS === 'ios') ? 20 : 15,
    }



})

export default stylesMsgRoom;

