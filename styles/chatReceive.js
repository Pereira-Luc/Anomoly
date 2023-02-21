import { StyleSheet, Dimensions } from 'react-native';

const stylesChatReceive = StyleSheet.create({
    MsgBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '1%',
        marginBottom: '1%',

    },
    lastMsg: {
        color: '#000',
        fontSize: 8,
    },
    pfPic: {
        backgroundColor: '#000',
        width: Dimensions.get('window').width * 0.07,
        height: Dimensions.get('window').width * 0.07,
        borderRadius: 100,
        marginRight: '2%',
    },
    textBubble: {
        maxWidth: Dimensions.get('window').width * 0.42,
        backgroundColor: '#AAB',
        borderRadius: 10,
    }, textBubblePadding: {
        padding: Dimensions.get('window').width * 0.02,
    },textContent: {}
})

export default stylesChatReceive;