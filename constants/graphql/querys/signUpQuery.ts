import {gql} from "@apollo/client";

export const SIGNUP_QUERY = gql`
    mutation signUp($username: String!, $password: String!, $confirmPassword: String!) {
        signUp(username: $username, password: $password, confirmPassword: $confirmPassword) {
            token
            tokenExpiration
            user {
                userId
                username
            }
        }
    }
`;
