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
        maxWidth: Dimensions.get('window').width * 0.80,
        backgroundColor: '#AAB',
        //left bottom border radius is 0 to make it look like a speech bubble
        borderRadius: 10,
        borderBottomLeftRadius: 2,
        left: Dimensions.get('window').width * 0.06,

    }, textBubblePadding: {
        padding: Dimensions.get('window').width * 0.02,
    },textContent: {}
})

export default stylesChatReceive;