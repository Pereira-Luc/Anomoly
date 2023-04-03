import {gql} from "@apollo/client";


export const ADD_FRIEND_QUERY = gql`
    mutation AddFriendQuery($friendId: ID!) {
        createFriends(friendId: $friendId)
    }
`;

//Accept friend request Query
export const ACCEPT_FRIEND_REQUEST_QUERY = gql`
    mutation AcceptFriendRequestQuery($friendId: ID!) {
        acceptRequest(friendId: $friendId)
    }
`;