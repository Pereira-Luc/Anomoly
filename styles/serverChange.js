import {Dimensions, Platform, StyleSheet} from "react-native";
import {colors} from "./colors/colors";

export default StyleSheet.create({
    container: {
        backgroundColor: colors.primaryBackground,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',

    },bottomSheetStyle: {
        backgroundColor: 'rgba(38,38,38,0)',
    },currenServerBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        verticalAlign: 'center',
        backgroundColor: colors.primaryBackgroundDark,
        height: Platform.OS === 'ios' ? '30%' : '40%',
        width: '100%',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
    },serverChangeInputBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        verticalAlign: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryBackgroundDark,
        height: '70%',
        width: '100%',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    changeServerBox: {
        backgroundColor: colors.primaryBackground,
        height: '50%',
        width: '90%',
        borderRadius: 20,
        padding: 10,
    },
    serverChangeText: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 20 : 15,
    },
    serverChangeTextHeader: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 30 : 20,
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
        fontSize: Platform.OS === 'ios' ? 20 : 15,
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
        height: (Platform.OS === 'ios') ? 50 : 40,
        backgroundColor:colors.primaryDetail,
        borderRadius: 10,
        marginRight: 5,
        marginTop: 10,
    },serverChangeButtonText: {
        color: 'white',
        fontSize: Platform.OS === 'ios' ? 20 : 15,
        width: '100%',
        textAlign: 'center',
    },serverChangeButtonReset: {
        color: '#000000',
        backgroundColor: colors.primaryDetailWarning,
    },serverChangeHeader: {
        width: '100%',
        height: Platform.OS === 'ios' ? 50 : 40,
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
        padding: Platform.OS === 'ios' ? 10 : 5,
        paddingLeft: 0,
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        textAlign: 'left',
        width: '100%',
        textAlign: 'center',
    }

});