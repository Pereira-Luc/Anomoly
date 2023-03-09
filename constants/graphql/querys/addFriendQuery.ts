import {gql} from "@apollo/client";


export const ADD_FRIEND_QUERY = gql`
    mutation AddFriendQuery($friendUsername: String!) {
        createFriends(friendUsername: $friendUsername)
    }
`;

//Accept friend request Query
export const ACCEPT_FRIEND_REQUEST_QUERY = gql`
    mutation AcceptFriendRequestQuery($friendUsername: String!) {
        acceptRequest(friendUsername: $friendUsername)
    }
`;