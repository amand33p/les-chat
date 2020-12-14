'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {}

  Conversation.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          max: 30,
        },
      },
      admin: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.ENUM('public', 'private', 'group'),
        allowNull: false,
      },
      participants: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      sequelize,
      modelName: 'Conversation',
      tableName: 'conversations',
    }
  );
  return Conversation;
};
