import {Dimensions, StyleSheet} from 'react-native';

const stylesChatSend = StyleSheet.create({
    MsgBox: {
        display: 'flex',
        marginTop: '1%',
        marginBottom: '1%',
        justifyContent: 'flex-end',
    },
    textBubble: {
        maxWidth: Dimensions.get('window').width * 0.80,
        backgroundColor: 'rgb(0,255,157)',
        //right bottom border radius is 0 to make it look like a speech bubble
        borderRadius: 10,
        borderBottomRightRadius: 2,
    }, textBubblePadding: {
        padding: Dimensions.get('window').width * 0.02,
    },
    rightSide: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        right: Dimensions.get('window').width * 0.05,
    },textContent: {}
})

export default stylesChatSend;

