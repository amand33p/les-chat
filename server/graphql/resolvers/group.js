const { Conversation, User } = require('../../models');
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

    addRemoveGroupUser: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { conversationId, userId, addOrDel } = args;

      const groupConversation = await Conversation.findOne({
        where: { id: conversationId },
      });

      if (!groupConversation || groupConversation.type !== 'group') {
        throw new UserInputError(
          `Invalid conversation ID, or conversation isn't of group type.`
        );
      }

      if (groupConversation.admin !== loggedUser.id) {
        throw new UserInputError('Access is denied.');
      }

      const userToAdd = await User.findOne({ where: { id: userId } });

      if (!userToAdd) {
        throw new UserInputError(
          `User with id: ${userId} does not exist in DB.`
        );
      }

      if (addOrDel === 'ADD') {
        if (groupConversation.participants.find((p) => p == userId)) {
          throw new UserInputError('User is already a member of the group.');
        } else {
          groupConversation.participants = [
            ...groupConversation.participants,
            userId,
          ];
        }
      } else {
        if (!groupConversation.participants.find((p) => p == userId)) {
          throw new UserInputError('User is not a member of the group.');
        } else {
          groupConversation.participants = groupConversation.participants.filter(
            (p) => p != userId
          );
        }
      }

      const savedConversation = await groupConversation.save();
      return savedConversation;
    },

    EditGroupName: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { conversationId, name } = args;

      if (name.trim() === '') {
        throw new UserInputError('Name field must not be empty.');
      }

      const groupConversation = await Conversation.findOne({
        where: { id: conversationId },
      });

      if (!groupConversation || groupConversation.type !== 'group') {
        throw new UserInputError(
          `Invalid conversation ID, or conversation isn't of group type.`
        );
      }

      if (groupConversation.admin !== loggedUser.id) {
        throw new UserInputError('Access is denied.');
      }

      groupConversation.name = name;
      const updatedConversation = await groupConversation.save();
      return updatedConversation;
    },
    deleteGroup: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { conversationId } = args;

      const groupConversation = await Conversation.findOne({
        where: { id: conversationId },
      });

      if (!groupConversation || groupConversation.type !== 'group') {
        throw new UserInputError(
          `Invalid conversation ID, or conversation isn't of group type.`
        );
      }

      if (groupConversation.admin !== loggedUser.id) {
        throw new UserInputError('Access is denied.');
      }

      await Conversation.destroy({ where: { id: conversationId } });
      return conversationId;
    },
  },
};
