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
  class user extends Model {

    static associate(models) {

    }
  }
  user.init({
    idUSER: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Cet email est déjà utilisé'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Veuillez rentrer un email valide'
        }
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    nickname: {
      unique: true,
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: {
          args: [4,30],
          msg: 'Le pseudo doit faire entre 4 et 30 caractères'
        }
      }
    },
    firstname: {
      type: DataTypes.STRING(100),
    },
    lastname: {
      type: DataTypes.STRING(100),
    },
    pictureUrl: {
      type: DataTypes.STRING(500),
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },  {
    sequelize,
    validate: {
      validateInput() {
        if (
          inputValidator(this.email) ||
          inputValidator(this.nickname) ||
          inputValidator(this.firstname) ||
          inputValidator(this.lastname)
        ) {
          throw new Error('Veuillez remplir les champs d\'input avec des caractères valides');
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};