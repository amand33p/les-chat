const userResolvers = require('./user');
const messageResolvers = require('./message');
const groupResolvers = require('./group');

module.exports = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...groupResolvers.Mutation,
  },
};
