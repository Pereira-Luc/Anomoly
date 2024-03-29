import {Dimensions, Platform, StyleSheet} from "react-native";
import {colors} from "./colors/colors";


export default StyleSheet.create({
    input: {
        width: (Platform.OS === 'ios') ? 300 : 250,
        height: (Platform.OS === 'ios') ? 47 : 42,
        borderRadius: 5,
        color: '#ffffff',
        marginBottom: 10,
        padding: 10,
        backgroundColor: colors.primaryBackgroundDark,
        fontSize: (Platform.OS === 'ios') ? 20 : 16,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: colors.primaryDetail,
        shadowOffset: { height: 5, width: 0 },
    },
    imgLogo: {
        width: (Platform.OS === 'ios') ? 220 : 190,
        height: (Platform.OS === 'ios') ? 220 : 190,
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
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryDetail,
    },
    container: {
        display: 'flex',
        backgroundColor: '#080e2c',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    heading1: {
        position: 'absolute',
        fontSize: Dimensions.get('window').width * 0.20,
        fontFamily: 'LogoFont',
        color: '#ffffff',
        top: (Platform.OS === 'ios') ? 220 : 150,
    },
    text: {
        color: '#ffffff',
        fontSize: Dimensions.get('window').width * 0.05,
    },
    smallText: {
        textAlign: 'center',
        paddingTop: 10,
        color: '#9b9b9b',
        fontSize: (Platform.OS === 'ios') ? 15 : 12,
    },
    mainContainer: {
        flex: 1,
        //Use primaryBackground color
        backgroundColor: colors.primaryBackground,
    },
    spacer: {
        top: '0%',
        padding: '7%',
    },
    bubbleButtonRight: {
        marginLeft: '5%',
        display: 'flex',
        top: '0%',
        width: '8%',
        height: Dimensions.get('window').width * 0.07,
        borderRadius: 100,
    },
    bubbleButtonLeft: {
        marginRight: '5%',
        display: 'flex',
        top: '0%',
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
        backgroundColor: colors.secondaryBackground,
        borderRadius: 10,
        padding: '3%',
        color: '#ffffff',
        height: (Platform.OS === 'ios') ? 40 : 35,
        fontSize: (Platform.OS === 'ios') ? 20 : 16,
    },
    footer: {
        position: 'absolute',
        height: '9%',
        backgroundColor: colors.primaryBackgroundDark,
        //backgroundColor: '#f50000',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        bottom: 0,
        borderRadius: 50,
        margin: '2.5%',
        marginBottom: 18,
        width: '95%',
    },
    msgScroll: {
        overflow: 'visible',
    },
    footerButton: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    groupsButtonFooter: {},
    chatsButtonFooter: {},
    settingButtonFooter: {},
    footerImg: {
        width: (Platform.OS === 'ios') ? 35 : 30,
        height: (Platform.OS === 'ios') ? 35 : 30,
        //Invert colors
        tintColor: '#ffffff',
    },
    footerImgActive: {
        width: (Platform.OS === 'ios') ? 35 : 30,
        height: (Platform.OS === 'ios') ? 35 : 30,
        //Invert colors
        tintColor: colors.primaryDetail,
    },
    centerTextHorizontal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageEdit: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageContainer: {
        width: (Platform.OS === 'ios') ? 180 : 150,
        height: (Platform.OS === 'ios') ? 180 : 150,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 100,
        overflow: 'hidden',
    },
    textH2Style: {
        fontSize: (Platform.OS === 'ios') ? 20 : 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    changeContainer: {
        backgroundColor: 'rgba(59,59,59,0.47)',
        borderBottomLeftRadius: (Platform.OS === 'ios') ? 170 : 90,
        borderBottomRightRadius: (Platform.OS === 'ios') ? 180 : 90,
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        top: '75%',
        width: '100%',
    },
    changeText: {
        color: colors.primaryDetailLight,
        fontSize: (Platform.OS === 'ios') ? 16 : 13,
        fontWeight: 'bold',
        top: -20,
        textAlign: 'center',
    },
    settingBox: {
        backgroundColor: colors.secondaryBackground,
        borderRadius: (Platform.OS === 'ios') ? 10 : 10,
        padding: '3%',
        color: '#ffffff',
        width: '90%',
    },
    settingsContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    textH3Style: {
        fontSize: (Platform.OS === 'ios') ? 15 : 12,
        fontWeight: 'bold',
        color: colors.primaryDetailLight,
        marginTop: 5,
    },
    marginTop5: {
        marginTop: 5,
    },
    bubbleButtonLeftImg: {
        width: '90%',
        height: '95%',
        //Invert colors
        tintColor: colors.primaryDetail,
    },bubbleButtonRightImg: {
        fontSize: (Platform.OS === 'ios') ? 20 : 15,
        width: '100%',
        height: '100%',
        //Invert colors
        color: colors.primaryDetail,
    },
    head: {
        backgroundColor: 'rgba(0,255,157,0)',
    },
    searchInput: {
        color: '#e3e3e3',
        fontSize: (Platform.OS === 'ios') ? 17 : 12,
    },
    profileImage: {
        width: (Platform.OS === 'ios') ? 180 : 150,
        height: (Platform.OS === 'ios') ? 180 : 150,
        position: 'absolute',
    },
    blurryBack: {
        backgroundColor: 'rgba(0,0,0,0.6)', // semi-transparent background
        ...StyleSheet.absoluteFillObject, // fills entire screen
        zIndex: 1, // ensures this style appears on top of other styles
    },
    errorBox: {
        backgroundColor: colors.primaryDetail,
        position: 'absolute',
        width: '100%',
        bottom: '110%',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        padding: '5%',
        borderBottomLeftRadius: 0,
    }, errorText: {
        color: '#000000',
        padding: '2%',
    },
    footerClear: {
        height: Platform.OS === 'ios' ? 105 : 90,
        width: '100%',
        backgroundColor: 'rgba(255,0,0,0)',
    }, privateKeyBox: {
        backgroundColor: colors.secondaryBackground,
        borderRadius: (Platform.OS === 'ios') ? 10 : 10,
        padding: Platform.OS === 'ios' ? 10 : 6,
        color: '#ffffff',
        marginTop: '20%',
        width: '95%',
    }, privateKeyBoxHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        padding: '3%',
        marginBottom: '3%',
    }, privateKeyBoxHeaderTitle: {
        fontSize: (Platform.OS === 'ios') ? 20 : 16,
        fontWeight: 'bold',
        color: colors.primaryDetailInformation,
    }, privateKeyBoxBody: {
        borderRadius: (Platform.OS === 'ios') ? 10 : 10,
        padding: '3%',
    }, privateKeyText: {
        color: '#ff0000',
        backgroundColor: colors.primaryBackgroundDark,
        padding: '5%',
        borderRadius: 10,
        marginBottom: '5%',
    }, privateKeyCopyInfo: {
        color: colors.primaryDetail,
        fontSize: (Platform.OS === 'ios') ? 15 : 12,
        marginTop: -10,
        marginBottom: 20,
    },
    privateKeyBoxButton: {
        backgroundColor: colors.primaryDetail,
        borderRadius: 10,
        padding: '3%',
        marginTop: '5%',
    }, privateKeyBoxButtonText: {
        color: '#000000',
        fontSize: (Platform.OS === 'ios') ? 15 : 12,
        textAlign: 'center',
    },
    privateKeyBoxButtonClose: {
        backgroundColor: colors.primaryDetailInformation,
        borderRadius: 10,
        padding: '3%',
        marginTop: '5%',
        width: '100%',
    },
    signUpSettingImage:{
        width:25,
        height:25,
        tintColor: "#ffffff",
    },
    signUpSettingImageBox:{
        position: 'absolute',
        bottom:-75,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        width: '100%',
    },
    signUpSettingImageText:{
        color:"grey",
        marginLeft:10,
    },settingSpacer:{
        height:1,
        backgroundColor: colors.primaryDetail,
        width:"85%",
        marginTop:20,
        marginBottom:20,
        borderRadius:10,
    }

})


