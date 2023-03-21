import {Platform, StyleSheet} from "react-native";
import {colors} from "./colors/colors";

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.primaryBackground,
        alignItems: 'center',
        height: Platform.OS === 'ios' ? 85 : 75,
        borderRadius: 5,
        marginBottom: 5,
    },
    pfPic: {
        marginLeft: 10,
        width: Platform.OS === 'ios' ? 60 : 50,
        height: Platform.OS === 'ios' ? 60 : 50,
        borderRadius: 30,
        backgroundColor: '#ffffff',
    },
    pfPicImg: {
        width: Platform.OS === 'ios' ? 60 : 50,
        height: Platform.OS === 'ios' ? 60 : 50,
        borderRadius: 30,
    }, pfNameContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    }, pfName: {
        color: '#ffffff',
        fontSize: Platform.OS === 'ios' ? 20 : 16,
    }, pfAddContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
    }, pfAddButton: {
        width: Platform.OS === 'ios' ? 100 : 90,
        height: Platform.OS === 'ios' ? 40 : 30,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: Platform.OS === 'ios' ? 145 : 120,
    }, pfAddButtonImg: {
        tintColor: colors.primaryDetail,
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25,
    },
    pfAddButtonText: {
        color: colors.primaryDetail,
    },
    pfAddButtonB: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: Platform.OS === 'ios' ? 100 : 90,
        height: Platform.OS === 'ios' ? 60 : 50,
    }
});