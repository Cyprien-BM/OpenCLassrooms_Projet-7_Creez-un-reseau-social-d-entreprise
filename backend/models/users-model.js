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
      unique: true
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
  });
  return User
}