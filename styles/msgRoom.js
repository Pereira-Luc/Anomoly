import {Dimensions, Platform, StyleSheet} from "react-native";
import {colors} from "./colors/colors";

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
        backgroundColor: colors.primaryBackground,
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
        backgroundColor: '#00ff9d',
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
        backgroundColor: colors.primaryBackground,
    }, head: {
        position: 'absolute',
        width: '100%',
        height: Dimensions.get('window').height * 0.11,
        backgroundColor: colors.primaryBackground,
    }, footer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.secondaryBackground,
        width: '95%',
        height: Dimensions.get('window').height * 0.09,
        marginLeft: '2.5%',
        borderRadius: 50,
        bottom: 20,
    }, msgInput: {
        backgroundColor: '#232323',
        height: '100%',
        borderRadius: 15,
        borderColor: 'rgba(0,255,157,0.32)',
        borderWidth: 1,
        paddingLeft: '3%',
        paddingRight: '3%',
        color: '#ffffff',
    },sendButton: {
        backgroundColor: '#3f3f3f',
        width: 50,
        height: 30,
        borderRadius: 15,
        //Center the text
        justifyContent: 'center',
        alignItems: 'center',
    }
    , container: {
        display: 'flex',
        marginLeft: '5%',
        marginRight: '5%',
    }, msgInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
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
        height: Dimensions.get('window').height * 0.9,
        left: -Dimensions.get('window').width * 0.08,
        tintColor: colors.primaryBackground,
        backgroundColor: colors.primaryBackgroundVeryDark,
    },
    sendButtonImg: {
        width: 20,
        height: 20,
        tintColor: '#00ff9d',
    }, nameOfUser: {
        justifyContent: "center",
        color: '#ffffff',
    },
    nameOfUserText: {
        color: '#ffffff',
        fontSize: 20,
    }, detailsText: {
        color: '#00ff9d',
        fontSize: (Platform.OS === 'ios') ? 20 : 15,
    },
    footerClear: {
        height: Platform.OS === 'ios' ? 105 : 90,
        width: '100%',
        backgroundColor: 'rgba(255,0,0,0)',

    }, headerClear: {
        height: Platform.OS === 'ios' ? 105 : 90,
        width: '100%',
        backgroundColor: 'rgba(255,0,0,0)',
    }, profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    }


})

export default stylesMsgRoom;

