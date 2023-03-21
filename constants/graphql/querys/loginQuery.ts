import {gql} from "@apollo/client";


export const LOGIN_QUERY = gql`
    query LoginQuery($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            tokenExpiration
            user {
                _id
                username
                publicKey
            }
        }
    }
`;