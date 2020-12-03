const { Message, Conversation, User } = require('../../models');
const { Op } = require('sequelize');
const { UserInputError } = require('apollo-server');
const authChecker = require('../../utils/authChecker');

module.exports = {
  Mutation: {
    sendPrivateMessage: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { receiverId, body } = args;

      const receivingUser = await User.findOne({ where: { id: receiverId } });

      if (!receivingUser) {
        throw new UserInputError(
          `User with id: ${receiverId} does not exist in DB.`
        );
      }

      if (body.trim() === '') {
        throw new UserInputError('Body field must not be empty.');
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
  },
};
