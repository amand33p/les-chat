const userResolvers = require('./user');
const messageResolvers = require('./message');
const groupResolvers = require('./group');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query,
    ...groupResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...groupResolvers.Mutation,
  },
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
};
