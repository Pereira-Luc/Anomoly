import { StyleSheet, Dimensions } from 'react-native';

const stylesChatSend = StyleSheet.create({
    MsgBox: {
        display: 'flex',
        marginTop: '1%',
        marginBottom: '1%',
        justifyContent: 'flex-end',
    },
    textBubble: {
        maxWidth: Dimensions.get('window').width * 0.42,
        backgroundColor: '#AAB',
        borderRadius: 10,
    }, textBubblePadding: {
        padding: Dimensions.get('window').width * 0.02,
    },
    rightSide: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },textContent: {}
})

export default stylesChatSend;

