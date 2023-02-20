import {Animated, Dimensions, Platform, StyleSheet} from "react-native";

export default StyleSheet.create({
    input: {
        width: (Platform.OS === 'ios') ? 300 : 250,
        height: (Platform.OS === 'ios') ? 47 : 42,
        borderRadius: 5,
        color: '#ffffff',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fontSize: (Platform.OS === 'ios') ? 20 : 16,
    },
    imgLogo: {
        width: (Platform.OS === 'ios') ? 350 : 300,
        height: (Platform.OS === 'ios') ? 350 : 300,
        position: 'absolute',
        top: (Platform.OS === 'ios') ? 20 : 0,
    },
    inputBody: {
        marginTop: (Platform.OS === 'ios') ? 350 : 300,
    },
    buttonsContainer: {
        marginTop: 10,
        width: (Platform.OS === 'ios') ? 300 : 250,
        height: (Platform.OS === 'ios') ? 47 : 42,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: '#080e2c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading1: {
        position: 'absolute',
        fontSize: (Platform.OS === 'ios') ? 95 : 85,
        fontFamily: 'LogoFont',
        color: '#ffffff',
        top: (Platform.OS === 'ios') ? 220 : 150,
    },
    text: {
        color: '#ffffff',
        fontSize: (Platform.OS === 'ios') ? 20 : 16,
    },
    smallText: {
        textAlign: 'center',
        paddingTop: 10,
        color: '#9b9b9b',
        fontSize: (Platform.OS === 'ios') ? 15 : 12,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#080e2c',
    },
    spacer: {
        top: '0%',
        padding: '7%',
    },
    bubbleButtonRight: {
        marginLeft: '5%',
        display: 'flex',
        top: '0%',
        backgroundColor: '#ffffff',
        width: '7%',
        height: Dimensions.get('window').width * 0.07,
        borderRadius: 100,
    },
    bubbleButtonLeft: {
        marginRight: '5%',
        display: 'flex',
        top: '0%',
        backgroundColor: '#ffffff',
        width: '7%',
        height: Dimensions.get('window').width * 0.07,
        borderRadius: 100,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textH1Style: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    searchBox: {
        margin: '5%',
        marginTop: '2%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        padding: '3%',
    },
    footer: {
        height: '10%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    msgScroll: {
        overflow: 'visible',
    }
})
