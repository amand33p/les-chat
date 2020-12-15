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
  Subscription: {
    ...messageResolvers.Subscription,
  },
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Group: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
};
