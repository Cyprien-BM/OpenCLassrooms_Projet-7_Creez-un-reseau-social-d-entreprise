'use strict';

// Check if input contain forbiden char and/or string
function inputValidator (input) {
  if (/<script>|<script\/>|SELECT|FROM|UPDATE|DELETE|SHOW|CREATE|ALTER|INSERT|DROP|=|;/g.test(input)) {
    return true;
  }else{return false}
}
//----------------------------------------------------------//

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {

    static associate(models) {
    }
  }
  post.init({
    idPOSTS: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'idUSER'
      }
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
      type: DataTypes.STRING(500),
    },
    likes: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    validate: {
      validateInput() {
        if (
          inputValidator(this.title) ||
          inputValidator(this.content)
        ) {
          throw new Error('Veuillez remplir les champs d\'input avec des caractères valides');
        }
      }
    }
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};