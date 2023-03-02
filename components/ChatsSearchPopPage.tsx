// import React in our code
import React, {useMemo, useRef} from 'react';

// import all the components we are going to use
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';

//import basic react native components
import BottomSheet from '@gorhom/bottom-sheet';
import {Portal} from "react-native-portalize";
import styles from "../styles/mainstyle";


const ChatSearchPopPage = ({visible, setVisible}: any) => {

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['90%', '90%'], []);

    return (
        <Portal>
            <BottomSheet
                ref={bottomSheetRef}
                index={visible ? 1 : -1}
                snapPoints={snapPoints}
                onChange={(index) => setVisible(index !== -1)}
                enablePanDownToClose={true}
                enableContentPanningGesture={true}
                enableOverDrag={true}
                backgroundStyle={{backgroundColor: '#151515'}}
                handleIndicatorStyle={{backgroundColor: '#00ff9d'}}

                style={chatSearchPop.bottomSheetStyle}>
                {/*Bottom Sheet inner View*/}
                <View style={chatSearchPop.bottomNavigationView}>
                    <View style={chatSearchPop.header}>
                        <Text style={chatSearchPop.headerText}>
                            New Message
                        </Text>
                    </View>
                    <View style={chatSearchPop.body}>
                        <View style={[styles.searchBox, chatSearchPop.searchBox]}>
                            <TextInput placeholderTextColor={"#a8a8a8"} placeholder="Search"
                                       style={styles.searchInput}></TextInput>
                        </View>
                        <View style={chatSearchPop.spacerLine}></View>
                        <View style={{flex: 1, flexDirection: 'row'}}>

                        </View>
                    </View>
                </View>
            </BottomSheet>
        </Portal>
    );
};

export default ChatSearchPopPage;

const chatSearchPop = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196c9',

    },
    bottomNavigationView: {
        backgroundColor: '#151515',
        width: '100%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheetStyle: {
        backgroundColor: 'rgba(38,38,38,0)',

    },
    headerText: {
        textAlign: 'center',
        padding: 10,
        fontSize: (Platform.OS === 'ios') ? 20 : 17,
        color: '#ffffff'
    }, header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    }, body: {
        flex: 1,
        backgroundColor: '#151515',
    },
    searchBox: {
        minWidth: '85%',
    }, spacerLine: {
        height: 1,
        backgroundColor: '#00ff9d',
        marginBottom: 10,
    },
    blurryBack: {
        backgroundColor: 'rgba(0,0,0,0.6)', // semi-transparent background
        ...StyleSheet.absoluteFillObject, // fills entire screen
        zIndex: 1, // ensures this style appears on top of other styles
    }
});