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

export const REMOVE_GROUP_USER = gql`
  mutation removeUser($conversationId: ID!, $userId: ID!) {
    removeGroupUser(conversationId: $conversationId, userId: $userId) {
      groupId
      participants
    }
  }
`;

export const ADD_GROUP_USER = gql`
  mutation addUser($conversationId: ID!, $participants: [ID!]!) {
    addGroupUser(conversationId: $conversationId, participants: $participants) {
      groupId
      participants
    }
  }
`;

export const EDIT_GROUP_NAME = gql`
  mutation updateGroupName($conversationId: ID!, $name: String!) {
    editGroupName(conversationId: $conversationId, name: $name) {
      groupId
      name
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation createNewGroup($name: String!, $participants: [ID!]) {
    createGroup(name: $name, participants: $participants) {
      ...GroupDetails
    }
  }
  ${GROUP_DETAILS}
`;

export const DELETE_GROUP = gql`
  mutation removeGroup($conversationId: ID!) {
    deleteGroup(conversationId: $conversationId)
  }
`;

export const LEAVE_GROUP = gql`
  mutation leaveGroup($conversationId: ID!) {
    leaveGroup(conversationId: $conversationId)
  }
`;
