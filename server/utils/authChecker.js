const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authChecker = ({ req, connection }) => {
  let token;
  if (req && req.headers.authorization) {
    token = req.headers.authorization;
  } else if (connection && connection.context.Authorization) {
    token = connection.context.Authorization;
  } else {
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
