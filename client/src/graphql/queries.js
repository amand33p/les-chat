import { gql } from '@apollo/client';
import { MESSAGE_DETAILS, GROUP_DETAILS } from './fragments';

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
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;

export const GET_PRIVATE_MSGS = gql`
  query fetchPrivateMsgs($userId: ID!) {
    getPrivateMessages(userId: $userId) {
      ...MessageDetails
    }
  }
  ${MESSAGE_DETAILS}
`;

export const GET_GROUP_MSGS = gql`
  query fetchGroupMsgs($conversationId: ID!) {
    getGroupMessages(conversationId: $conversationId) {
      ...MessageDetails
    }
  }
  ${MESSAGE_DETAILS}
`;

export const GET_GLOBAL_MSGS = gql`
  query {
    getGlobalMessages {
      ...MessageDetails
    }
  }
  ${MESSAGE_DETAILS}
`;
