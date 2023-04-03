import {gql} from "@apollo/client";

export const SIGNUP_QUERY = gql`
    mutation signUp($username: String!, $password: String!, $confirmPassword: String!, $publicKey: Base64!) {
        signUp(username: $username, password: $password, confirmPassword: $confirmPassword, publicKey: $publicKey) {
            token
            tokenExpiration
            user {
                _id
                username
            }
        }
    }
`;
