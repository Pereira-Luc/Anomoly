import { gql } from '@apollo/client';

export const REFUSE_FRIEND_REQUEST_QUERY = gql`
    mutation RefuseRequest($friendId: ID!) {
    refuseRequest(friendId: $friendId)
  }
`;
            