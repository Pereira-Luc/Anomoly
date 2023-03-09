import {gql} from "@apollo/client";

export const SEARCH_QUERY = gql`
    query SearchQuery($v: String!) {
        searchUser(v: $v) {
            userId
            username
            friendRequestStatus {
                status
                needToAcceptBy
            }
        }
    }
`;