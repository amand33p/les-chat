'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: 'admin',
        as: 'adminUser',
      });
    }
  }

  Conversation.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          max: 30,
          min: 3,
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
