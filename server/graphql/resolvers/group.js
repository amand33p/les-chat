const { Conversation, User, Message } = require('../../models');
const { Op } = require('sequelize');
const { UserInputError } = require('apollo-server');
const authChecker = require('../../utils/authChecker');

module.exports = {
  Query: {
    getGroups: async (_, __, context) => {
      const loggedUser = authChecker(context);

      try {
        let groupConversations = await Conversation.findAll({
          where: {
            [Op.and]: [
              { type: 'group' },
              {
                participants: { [Op.contains]: [loggedUser.id] },
              },
            ],
          },
          include: [
            {
              model: User,
              as: 'adminUser',
              attributes: ['id', 'username'],
            },
          ],
        });

        const groupMessages = await Message.findAll({
          include: [
            {
              model: Conversation,
              as: 'conversation',
              where: {
                [Op.and]: [
                  { type: 'group' },
                  {
                    participants: { [Op.contains]: [loggedUser.id] },
                  },
                ],
              },
              attributes: [],
            },
            {
              model: User,
              as: 'user',
              attributes: ['username', 'id'],
            },
          ],
          order: [['createdAt', 'DESC']],
        });

        groupConversations = groupConversations.map((groupConv) => {
          const latestMessage = groupMessages.find(
            (message) => message.conversationId === groupConv.id
          );
          groupConv.latestMessage = latestMessage;
          return groupConv;
        });

        return groupConversations;
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    getGlobalGroup: async () => {
      try {
        const globalConversation = await Conversation.findOne({
          where: { type: 'public' },
        });

        if (globalConversation) {
          const latestMessage = await Message.findOne({
            include: [
              {
                model: Conversation,
                as: 'conversation',
                where: {
                  type: 'public',
                },
                attributes: [],
              },
              {
                model: User,
                as: 'user',
                attributes: ['username', 'id'],
              },
            ],
            order: [['createdAt', 'DESC']],
          });

          return { ...globalConversation.toJSON(), latestMessage };
        }
      } catch (err) {
        throw new UserInputError(err);
      }
    },
  },
  Mutation: {
    createGroup: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { name, participants } = args;

      if (name.trim() === '') {
        throw new UserInputError('Name field must not be empty.');
      }

      if (name.length > 30) {
        throw new UserInputError(
          'Title character length must not be more than 30.'
        );
      }

      try {
        const users = await User.findAll();
        const userIds = users.map((u) => u.id.toString());

        if (!participants.every((p) => userIds.includes(p))) {
          throw new UserInputError(
            'Participants array must contain valid user IDs.'
          );
        }

        if (
          participants.filter((p, i) => i !== participants.indexOf(p))
            .length !== 0 ||
          participants.includes(loggedUser.id.toString())
        ) {
          throw new UserInputError(
            'Participants array must not contain duplicate IDs.'
          );
        }

        const group = await Conversation.create({
          name,
          admin: loggedUser.id,
          type: 'group',
          participants: [loggedUser.id, ...participants],
        });

        return {
          ...group.toJSON(),
          adminUser: { id: loggedUser.id, username: loggedUser.username },
        };
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    removeGroupUser: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { conversationId, userId } = args;

      try {
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

        if (groupConversation.admin === userId) {
          throw new UserInputError("You can't remove the admin.");
        }

        const userToAdd = await User.findOne({ where: { id: userId } });

        if (!userToAdd) {
          throw new UserInputError(
            `User with id: ${userId} does not exist in DB.`
          );
        }

        if (!groupConversation.participants.find((p) => p == userId)) {
          throw new UserInputError('User is not a member of the group.');
        }

        groupConversation.participants = groupConversation.participants.filter(
          (p) => p != userId
        );
        const savedConversation = await groupConversation.save();
        return {
          groupId: savedConversation.id,
          participants: savedConversation.participants,
        };
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    addGroupUser: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { conversationId, participants } = args;

      if (!participants || participants.length === 0) {
        throw new UserInputError('Participants field must not be empty.');
      }

      try {
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

        const users = await User.findAll();
        const userIds = users.map((u) => u.id.toString());

        if (!participants.every((p) => userIds.includes(p))) {
          throw new UserInputError(
            'Participants array must contain valid user IDs.'
          );
        }

        const updatedParticipants = [
          ...groupConversation.participants,
          ...participants,
        ];

        if (
          updatedParticipants.filter(
            (p, i) => i !== updatedParticipants.indexOf(p)
          ).length !== 0 ||
          updatedParticipants.includes(loggedUser.id.toString())
        ) {
          throw new UserInputError(
            'Participants array must not contain duplicate or already added users.'
          );
        }

        groupConversation.participants = updatedParticipants;
        const savedConversation = await groupConversation.save();
        return {
          groupId: savedConversation.id,
          participants: savedConversation.participants,
        };
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    editGroupName: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { conversationId, name } = args;

      if (name.trim() === '') {
        throw new UserInputError('Name field must not be empty.');
      }

      try {
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
        return {
          groupId: updatedConversation.id,
          name: updatedConversation.name,
        };
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    deleteGroup: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { conversationId } = args;

      try {
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
        await Message.destroy({ where: { conversationId } });
        return conversationId;
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    leaveGroup: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { conversationId } = args;

      try {
        const groupConversation = await Conversation.findOne({
          where: { id: conversationId },
        });

        if (!groupConversation || groupConversation.type !== 'group') {
          throw new UserInputError(
            `Invalid conversation ID, or conversation isn't of group type.`
          );
        }

        if (groupConversation.admin === loggedUser.id) {
          throw new UserInputError("Admin can't leave the group.");
        }

        if (!groupConversation.participants.includes(loggedUser.id)) {
          throw new UserInputError("You're not a member of the group.");
        }

        groupConversation.participants = groupConversation.participants.filter(
          (p) => p !== loggedUser.id
        );

        await groupConversation.save();
        return conversationId;
      } catch (err) {
        throw new UserInputError(err);
      }
    },
  },
};
