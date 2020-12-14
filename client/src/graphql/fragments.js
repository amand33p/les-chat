import { gql } from '@apollo/client';

export const LOGGED_USER_DETAILS = gql`
  fragment LoggedUserDetails on LoggedUser {
    id
    username
    token
  }
`;

export const MESSAGE_DETAILS = gql`
  fragment MessageDetails on Message {
    id
    body
    conversationId
    senderId
    createdAt
    user {
      id
      username
    }
  }
`;
