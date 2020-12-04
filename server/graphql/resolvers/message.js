const { Message, Conversation, User } = require('../../models');
const { Op } = require('sequelize');
const { UserInputError } = require('apollo-server');
const authChecker = require('../../utils/authChecker');

module.exports = {
  Query: {
    getPrivateMessages: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { userId } = args;

      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        throw new UserInputError(
          `User with id: ${userId} does not exist in DB.`
        );
      }

      const messages = await Message.findAll({
        include: [
          {
            model: Conversation,
            as: 'conversation',
            where: {
              [Op.and]: [
                { type: 'private' },
                {
                  participants: { [Op.contains]: [loggedUser.id, userId] },
                },
              ],
            },
          },
        ],
        order: [['createdAt', 'ASC']],
      });

      return messages;
    },
  },
  Mutation: {
    sendPrivateMessage: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { receiverId, body } = args;

      if (body.trim() === '') {
        throw new UserInputError('Body field must not be empty.');
      }

      const receivingUser = await User.findOne({ where: { id: receiverId } });

      if (!receivingUser) {
        throw new UserInputError(
          `User with id: ${receiverId} does not exist in DB.`
        );
      }

      if (receiverId == loggedUser.id) {
        throw new UserInputError("You can't send private message to yourself.");
      }

      let conversation = await Conversation.findOne({
        where: {
          [Op.and]: [
            { type: 'private' },
            { participants: { [Op.contains]: [loggedUser.id, receiverId] } },
          ],
        },
      });

      if (!conversation) {
        const newConversation = new Conversation({
          type: 'private',
          participants: [loggedUser.id, receiverId],
        });

        conversation = await newConversation.save();
      }

      const newMessage = await Message.create({
        conversationId: conversation.id,
        senderId: loggedUser.id,
        body,
      });

      return newMessage;
    },

    sendGroupMessage: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { conversationId, body } = args;

      if (body.trim() === '') {
        throw new UserInputError('Body field must not be empty.');
      }

      const groupConversation = await Conversation.findOne({
        where: { id: conversationId },
      });

      if (!groupConversation || groupConversation.type !== 'group') {
        throw new UserInputError(
          `Invalid Group ID, or conversation isn't of type group.`
        );
      }

      if (!groupConversation.participants.includes(loggedUser.id)) {
        throw new UserInputError(
          'Access is denied. Only members of the group can send messages.'
        );
      }

      const newMessage = await Message.create({
        conversationId,
        senderId: loggedUser.id,
        body,
      });

      return newMessage;
    },

    sendGlobalMessage: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { body } = args;

      if (body.trim() === '') {
        throw new UserInputError('Body field must not be empty.');
      }

      const globalConversation = await Conversation.findOne({
        where: { type: 'public' },
      });

      if (!globalConversation) {
        throw new UserInputError(`Global Chat group does not exist.`);
      }

      const newMessage = await Message.create({
        conversationId: globalConversation.id,
        senderId: loggedUser.id,
        body,
      });

      return newMessage;
    },
  },
};
