const { User, Message, Conversation } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { UserInputError } = require('apollo-server');
const { registerValidator, loginValidator } = require('../../utils/validators');
const authChecker = require('../../utils/authChecker');
const { JWT_SECRET } = require('../../utils/config');

module.exports = {
  Query: {
    getAllUsers: async (_, __, context) => {
      const loggedUser = authChecker(context);

      try {
        let users = await User.findAll({
          where: { id: { [Op.ne]: loggedUser.id } },
        });

        const privateMessages = await Message.findAll({
          include: [
            {
              model: Conversation,
              as: 'conversation',
              where: {
                [Op.and]: [
                  { type: 'private' },
                  {
                    participants: { [Op.contains]: [loggedUser.id] },
                  },
                ],
              },
              attributes: ['participants'],
            },
            {
              model: User,
              as: 'user',
              attributes: ['username', 'id'],
            },
          ],
          order: [['createdAt', 'DESC']],
        });

        users = users.map((user) => {
          const latestMessage = privateMessages.find((p) =>
            p.conversation.participants.includes(user.id)
          );
          user.latestMessage = latestMessage;
          return user;
        });

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

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        passwordHash,
      });

      const savedUser = await user.save();

      const token = jwt.sign(
        { id: savedUser.id, username: savedUser.username },
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
        { id: user.id, username: user.username },
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
