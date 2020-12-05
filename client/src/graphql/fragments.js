import { gql } from '@apollo/client';

export const LOGGED_USER_DETAILS = gql`
  fragment LoggedUserDetails on LoggedUser {
    id
    username
    token
  }
`;
