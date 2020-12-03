const { Conversation, User } = require('../../models');
const { Op } = require('sequelize');
const { UserInputError } = require('apollo-server');
const authChecker = require('../../utils/authChecker');

module.exports = {
  Mutation: {
    createGroup: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { name } = args;

      if (name.trim() === '') {
        throw new UserInputError('Name field must not be empty.');
      }

      if (name.length > 30) {
        throw new UserInputError(
          'Title character length must not be more than 30.'
        );
      }

      const group = await Conversation.create({
        name,
        admin: loggedUser.id,
        type: 'group',
        participants: [loggedUser.id],
      });
      return group;
    },

    addUserToGroup: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { conversationId, userToAddId } = args;

      const groupConversation = await Conversation.findOne({
        where: { id: conversationId },
      });

      if (!groupConversation || groupConversation.type !== 'group') {
        throw new UserInputError(
          `Invalid Group ID, or conversation isn't of type group.`
        );
      }

      if (groupConversation.admin !== loggedUser.id) {
        throw new UserInputError('Access is denied.');
      }

      const userToAdd = await User.findOne({ where: { id: userToAddId } });

      if (!userToAdd) {
        throw new UserInputError(
          `User with id: ${userToAddId} does not exist in DB.`
        );
      }

      if (groupConversation.participants.find((p) => p == userToAddId)) {
        throw new UserInputError('User is already a member of the group.');
      } else {
        groupConversation.participants = [
          ...groupConversation.participants,
          userToAddId,
        ];
      }

      const savedConversation = await groupConversation.save();
      return savedConversation;
    },
  },
};
