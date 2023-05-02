import {gql} from "@apollo/client";


export const UNFRIEND = gql`
    mutation unFriend($userId: ID!) {
        unFriend(friendId: $userId)
    }
`;

