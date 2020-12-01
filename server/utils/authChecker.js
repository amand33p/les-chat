const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authChecker = (context) => {
  const token = context.req ? context.req.headers.authorization : null;
  if (!token) {
    throw new AuthenticationError('No auth token found. Authorization denied.');
  }

  try {
    const decodedUser = jwt.verify(token, JWT_SECRET);
    return decodedUser;
  } catch (err) {
    throw new AuthenticationError(err);
  }
};

module.exports = authChecker;
