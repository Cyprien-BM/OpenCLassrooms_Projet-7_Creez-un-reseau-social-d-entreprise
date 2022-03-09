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
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.post.belongsTo(models.user, {
      //   foreignKey: {
      //     allowNull: false
      //   }
      // })
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
      defaultValue: 0,
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