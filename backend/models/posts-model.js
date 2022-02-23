module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('POST', {
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
      type: DataTypes.STRING,
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
  });
  return Post
}