// Check if input contain forbiden char and/or string
function inputValidator (input) {
  if (/<script>|<script\/>|SELECT|FROM|UPDATE|DELETE|=|;/g.test(input)) {
    return true;
  }else{return false}
}
//----------------------------------------------------------//

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('USER', {
    idUSERS: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
      type: DataTypes.STRING(100),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(64),
    },
    lastname: {
      type: DataTypes.STRING(64),
    },
    pictureUrl: {
      type: DataTypes.BLOB("long"),
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
  });
  return User
}