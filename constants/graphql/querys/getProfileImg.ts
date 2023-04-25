import {gql} from "@apollo/client";


export const GET_USER_PROFILE_IMG = gql`
    query getProfileImageUri($userId: ID!) {
        getUserProfilePic(userId: $userId)
    }
`