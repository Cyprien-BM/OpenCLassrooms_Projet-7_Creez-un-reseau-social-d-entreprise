'use strict';

// Check if input contain forbiden char and/or string
function inputValidator (input) {
  if (/<script>|<script\/>|SELECT|FROM|UPDATE|DELETE|CREATE|SHOW|=|;/g.test(input)) {
    return true;
  }else{return false}
}
//----------------------------------------------------------//

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.user.hasMany(models.post, {
      // })
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
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Veuillez rentrer un email valide"
        }
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    nickname: {
      unique: true,
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [4,50],
          msg: "Le pseudo doit faire entre 4 et 50 caractères"
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