import {gql} from "@apollo/client";


export const CHECK_IF_LOGGED_IN = gql`
    query isAuth {
        isAuth
    }
`;
