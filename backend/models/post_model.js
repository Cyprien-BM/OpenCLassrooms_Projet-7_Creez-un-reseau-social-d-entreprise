'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.post.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  post.init({
    idPOSTS: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    postIdUSERS: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.BLOB("long"),
    },
    likes: {
      type: DataTypes.INTEGER,
    },
    dislikes: {
      type: DataTypes.INTEGER,
    },
    usersLiked: {
      type: DataTypes.JSON,
    },
    usersDisliked: {
      type: DataTypes.JSON,
    }
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};