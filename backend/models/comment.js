'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'posts',
        key: 'idPOSTS'
      }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'idUSER'
      }
    },
    content: {
      type: DataTypes.STRING(1500)
    },
    imageUrl: {
      type: DataTypes.STRING(500)
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};