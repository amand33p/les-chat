const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { UserInputError } = require('apollo-server');
const { registerValidator, loginValidator } = require('../../utils/validators');
const { JWT_SECRET } = require('../../utils/config');

module.exports = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (err) {
        throw new UserInputError(err);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { username, password } = args;
      const { errors, valid } = registerValidator(username, password);

      if (!valid) {
        throw new UserInputError(Object.values(errors)[0], { errors });
      }

      const existingUser = await User.findOne({
        where: { username: { [Op.iLike]: username } },
      });

      if (existingUser) {
        throw new UserInputError(`Username '${username}' is already taken.`);
      }

      console.log(username, password);

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        passwordHash,
      });

      const savedUser = await user.save();

      const token = jwt.sign(
        {
          id: savedUser.id,
        },
        JWT_SECRET
      );

      return {
        id: savedUser.id,
        username: savedUser.username,
        token,
      };
    },

    login: async (_, args) => {
      const { username, password } = args;
      const { errors, valid } = loginValidator(username, password);

      if (!valid) {
        throw new UserInputError(Object.values(errors)[0], { errors });
      }

      const user = await User.findOne({
        where: { username: { [Op.iLike]: username } },
      });

      if (!user) {
        throw new UserInputError(`User: '${username}' not found.`);
      }

      const credentialsValid = await bcrypt.compare(
        password,
        user.passwordHash
      );

      if (!credentialsValid) {
        throw new UserInputError('Invalid credentials.');
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        JWT_SECRET
      );

      return {
        id: user.id,
        username: user.username,
        token,
      };
    },
  },
};
