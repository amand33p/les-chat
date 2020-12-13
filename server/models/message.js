'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ Conversation, User }) {
      // define association here
      this.belongsTo(Conversation, {
        foreignKey: 'conversationId',
        as: 'conversation',
      });

      this.belongsTo(User, {
        foreignKey: 'senderId',
        as: 'user',
      });
    }
  }
  Message.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Message',
      tableName: 'messages',
    }
  );
  return Message;
};
