import {Dimensions, StyleSheet} from 'react-native';
import {colors} from "./colors/colors";

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
        backgroundColor: colors.lightMajor,
        //left bottom border radius is 0 to make it look like a speech bubble
        borderRadius: 10,
        borderBottomLeftRadius: 2,
        left: Dimensions.get('window').width * 0.1,

    }, textBubblePadding: {
        padding: Dimensions.get('window').width * 0.02,
    },textContent: {}
})

export default stylesChatReceive;