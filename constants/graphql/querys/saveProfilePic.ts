import {gql} from "@apollo/client";

export const SAVE_PROFILE_PIC = gql`
    mutation changeProfilePicture($image: String!) {
        changeProfilePicture(image: $image)
    }
`;