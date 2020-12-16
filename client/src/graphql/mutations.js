import { gql } from '@apollo/client';
import {
  LOGGED_USER_DETAILS,
  MESSAGE_DETAILS,
  GROUP_DETAILS,
} from './fragments';

export const REGISTER_USER = gql`
  mutation registerUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      ...LoggedUserDetails
    }
  }
  ${LOGGED_USER_DETAILS}
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...LoggedUserDetails
    }
  }
  ${LOGGED_USER_DETAILS}
`;

export const SEND_PRIVATE_MSG = gql`
  mutation submitPrivateMsg($receiverId: ID!, $body: String!) {
    sendPrivateMessage(receiverId: $receiverId, body: $body) {
      ...MessageDetails
    }
  }
  ${MESSAGE_DETAILS}
`;

export const SEND_GROUP_MSG = gql`
  mutation submitGroupMsg($conversationId: ID!, $body: String!) {
    sendGroupMessage(conversationId: $conversationId, body: $body) {
      ...MessageDetails
    }
  }
  ${MESSAGE_DETAILS}
`;

export const SEND_GLOBAL_MSG = gql`
  mutation submitGlobalMsg($body: String!) {
    sendGlobalMessage(body: $body) {
      ...MessageDetails
    }
  }
  ${MESSAGE_DETAILS}
`;

export const ADD_REMOVE_GROUP_USER = gql`
  mutation addRemoveUser(
    $conversationId: ID!
    $userId: ID!
    $addOrDel: AddOrDelete!
  ) {
    addRemoveGroupUser(
      conversationId: $conversationId
      userId: $userId
      addOrDel: $addOrDel
    ) {
      groupId
      participants
    }
  }
`;
