import {StyleSheet} from "react-native";
import {colors} from "./colors/colors";

export default StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: colors.primaryBackground,
        height: '117%',
        width: '100%',
        borderRadius: 20,
        padding: 10,
        top: -40,
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowColor: colors.primaryDetail,
    },
    serverChangeText: {
        color: '#ffffff',
        fontSize: 20,
    },
    serverChangeTextHeader: {
        color: '#ffffff',
        fontSize: 20,
        marginTop: 10,
        width: '100%',
        textAlign: 'center',

    },
    serverChangeBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        verticalAlign: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },serverChangeInput: {
        color: '#ffffff',
        fontSize: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: '100%',
        height: 40,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
    },
    serverChangeButton: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: 40,
        backgroundColor:colors.primaryDetail,
        borderRadius: 10,
        marginRight: 5,
    },serverChangeButtonText: {
        color: '#000000',
        fontSize: 20,
        width: '100%',
        textAlign: 'center',
    },serverChangeHeader: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        top: 0,
    },serverChangeBody: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        top: -50,
    },serverChangeTextB: {
        paddingTop: 30,
        padding: 20,
        paddingLeft: 0,
        color: '#ffffff',
        fontSize: 15,
        textAlign: 'left',
        width: '100%',
    }

});