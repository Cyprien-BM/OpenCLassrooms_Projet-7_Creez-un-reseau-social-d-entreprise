'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Like.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'idPOSTS',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'idUSER',
        },
      },
      likeValue: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
