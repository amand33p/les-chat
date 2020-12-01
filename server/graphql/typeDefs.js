const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    username: String!
  }

  type LoggedUser {
    id: ID!
    username: String!
    token: String!
  }

  type Query {
    getAllUsers: [User]!
  }

  type Mutation {
    register(username: String!, password: String!): LoggedUser!
    login(username: String!, password: String!): LoggedUser!
  }
`;
