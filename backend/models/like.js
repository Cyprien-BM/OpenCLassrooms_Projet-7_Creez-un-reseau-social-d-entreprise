'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.belongToMany(models.post, {
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'postId'
      });

      models.post.belongToMany(models.user, {
        through: models.Like,
        foreignKey: 'postId',
        otherKey: 'userId'
      });

      models.Like.belongTo(models.user, {
        foreignKey: 'userId',
        as: 'user'
      });

      models.Like.belongTo(models.post, {
        foreignKey: 'postId',
        as: 'post'
      });
    }
  }
  Like.init({
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'idPOSTS'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'idUSER'
      }
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};