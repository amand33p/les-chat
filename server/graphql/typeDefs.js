const { gql } = require('apollo-server');

module.exports = gql`
  enum AddOrDelete {
    ADD
    DELETE
  }

  type User {
    id: ID!
    username: String!
    createdAt: String!
    latestMessage: Message
  }

  type MessageUser {
    id: ID!
    username: String!
  }

  type Message {
    id: ID!
    body: String!
    conversationId: ID!
    senderId: ID!
    createdAt: String!
    user: MessageUser
  }

  type Group {
    id: ID!
    name: String!
    admin: ID!
    type: String!
    participants: [ID!]!
    createdAt: String!
    latestMessage: Message
  }

  type GlobalGroup {
    id: ID!
    name: String!
    type: String!
    createdAt: String!
    latestMessage: Message
  }

  type LoggedUser {
    id: ID!
    username: String!
    token: String!
  }

  type SubbedMessage {
    message: Message!
    type: String!
    participants: [ID!]
  }

  type Query {
    getAllUsers: [User]!
    getGroups: [Group]!
    getGlobalGroup: GlobalGroup

    getPrivateMessages(userId: ID!): [Message]!
    getGroupMessages(conversationId: ID!): [Message]!
    getGlobalMessages: [Message]!
  }

  type Mutation {
    register(username: String!, password: String!): LoggedUser!
    login(username: String!, password: String!): LoggedUser!

    sendPrivateMessage(receiverId: ID!, body: String!): Message!
    sendGroupMessage(conversationId: ID!, body: String!): Message!
    sendGlobalMessage(body: String): Message!

    createGroup(name: String!): Group!
    EditGroupName(conversationId: ID!, name: String!): Group!
    deleteGroup(conversationId: ID!): ID!
    addRemoveGroupUser(
      conversationId: ID!
      userId: ID!
      addOrDel: AddOrDelete!
    ): Group!
  }

  type Subscription {
    newMessage: SubbedMessage!
  }
`;
