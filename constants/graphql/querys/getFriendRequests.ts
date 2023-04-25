import {gql} from "@apollo/client";

export const GET_ALL_FRIEND_REQUESTS = gql`
    query getAllFriendRequests {
        getFriendRequests{
            _id
            username
            friendRequestStatus {
                needToAcceptBy
                status
            }
        }
    }
`