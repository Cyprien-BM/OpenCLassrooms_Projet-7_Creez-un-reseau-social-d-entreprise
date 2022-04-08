'use strict';

// Check if input contain forbiden char and/or string
function inputValidator(input) {
  if (
    /<script>|<script\/>|SELECT|FROM|UPDATE|DELETE|SHOW|CREATE|ALTER|INSERT|DROP|=|;/g.test(
      input
    )
  ) {
    return true;
  } else {
    return false;
  }
}
//----------------------------------------------------------//

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
    commentId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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
  }, 
  {
    sequelize,
    validate: {
      validateInput() {
        if (!this.content && !this.imageUrl) {
          throw new Error('Veuillez ajouter un texte ou ajouter une image');
        } else if (
          inputValidator(this.title) ||
          inputValidator(this.content)
        ) {
          throw new Error(
            "Veuillez remplir les champs d'input avec des caractères valides"
          );
        }
      },
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};