const userResolvers = require('./user');

module.exports = {
  Query: {
    ...userResolvers.Query,
  },
};
