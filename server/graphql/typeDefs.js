const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    createdAt: String!
  }

  type LoggedUser {
    id: ID!
    username: String!
    token: String!
  }

  type Message {
    id: ID!
    body: String!
    conversationId: ID!
    senderId: ID!
  }

  type Query {
    getAllUsers: [User]!
  }

  type Mutation {
    register(username: String!, password: String!): LoggedUser!
    login(username: String!, password: String!): LoggedUser!

    sendPrivateMessage(receiverId: ID!, body: String!): Message!
  }
`;
