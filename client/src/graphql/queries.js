import { gql } from '@apollo/client';
import { MESSAGE_DETAILS } from './fragments';

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      username
      createdAt
      latestMessage {
        ...MessageDetails
      }
    }
  }
  ${MESSAGE_DETAILS}
`;

export const GET_GLOBAL_GROUP = gql`
  query {
    getGlobalGroup {
      id
      name
      type
      createdAt
      latestMessage {
        ...MessageDetails
      }
    }
  }
  ${MESSAGE_DETAILS}
`;

export const GET_GROUPS = gql`
  query {
    getGroups {
      id
      name
      admin
      type
      participants
      createdAt
      latestMessage {
        ...MessageDetails
      }
    }
  }
  ${MESSAGE_DETAILS}
`;
