// import React in our code
import React, { useMemo, useRef } from 'react';

// import all the components we are going to use
import { Keyboard, Platform, StyleSheet, Text, TextInput, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

//import basic react native components
import BottomSheet from '@gorhom/bottom-sheet';
import { Portal } from "react-native-portalize";
import styles from "../styles/mainstyle";
import { colors } from "../styles/colors/colors";
import { useQuery } from "@apollo/client";
import { SEARCH_QUERY } from "../constants/graphql/querys/searchUser";
import ProfileSearchBox from "./ProfileSearchBox";
import { GET_ALL_FRIEND_REQUESTS } from "../constants/graphql/querys/getFriendRequests";

const ChatSearchPopPage = ({ visible, setVisible }: any) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['90%', '90%'], []);

    let [searchText, setSearchText] = React.useState("");
    let [dataToShow, setDataToShow] = React.useState<any>([]);

    //Get Search Results from API SEARCH_QUERY
    let { error, data } = useQuery(SEARCH_QUERY, {
        variables:
        {
            v: searchText
        },
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            setDataToShow(data.searchUser)
        }
    });

    //load all the active friend requests
    let { error: friendRequestError, data: friendRequestData } = useQuery(GET_ALL_FRIEND_REQUESTS, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            setDataToShow(data.getFriendRequests)
        }
    });


    if (friendRequestError) console.log(friendRequestError.message);
    if (error) console.log(error.message);

    //Function to remove a friend request from the list
    const removeFriendRequest = (userId: string) => {
        setDataToShow(dataToShow.filter((item: any) => item._id !== userId))
    }


    return (


        <Portal>
            <BottomSheet
                ref={bottomSheetRef}
                index={visible ? 1 : -1}
                snapPoints={snapPoints}
                onChange={(index) => {
                    setVisible(index !== -1)
                    // Close the keyboard if the bottom sheet is closed
                    if (index === -1) Keyboard.dismiss()
                }}
                enablePanDownToClose={true}
                backgroundStyle={{ backgroundColor: colors.primaryBackgroundVeryDark, }}
                handleIndicatorStyle={{ backgroundColor: colors.primaryDetail }}
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
                            <TextInput onChangeText={(v) => setSearchText(v)} placeholderTextColor={"#a8a8a8"}
                                placeholder="Search"
                                style={styles.searchInput}></TextInput>
                        </View>
                        <View style={chatSearchPop.spacerLine}></View>
                        <FlatList
                            data={dataToShow}
                            renderItem={({ item }) => {
                                console.log("Item: ", item)
                                return (<ProfileSearchBox key={item._id} userId={item._id} username={item.username}
                                    friendRequestStatus={item.friendRequestStatus} removeFirendRequestParent={removeFriendRequest}/>)
                            }}
                            keyExtractor={item => item.userId} />
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
        color: '#ffffff',
        marginTop: 20,
    }, header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    }, body: {},
    searchBox: {
        minWidth: '85%',
    }, spacerLine: {
        height: 1,
        backgroundColor: colors.primaryDetail,
        marginBottom: 10,
    },
    blurryBack: {
        backgroundColor: 'rgba(0,0,0,0.6)', // semi-transparent background
        ...StyleSheet.absoluteFillObject, // fills entire screen
        zIndex: 1, // ensures this style appears on top of other styles
    }
});