const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    username: String!
  }

  type Query {
    getAllUsers: [User]!
  }
`;
