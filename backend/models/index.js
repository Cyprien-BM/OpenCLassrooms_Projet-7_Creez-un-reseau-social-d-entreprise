'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

// add all models
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require('./user_model')(sequelize, Sequelize);
db.posts = require('./post_model')(sequelize, Sequelize);
db.like = require('./like')(sequelize, Sequelize);
db.comment = require('./comment')(sequelize, Sequelize);

// Association one to many between user and post
db.users.hasMany(db.posts, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});
db.posts.belongsTo(db.users, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  }
});
// ----------------------------------------------//

// Association many to many between like, user and post
db.users.belongsToMany(db.posts, {
  through: db.like,
  foreignKey: 'userId',
  otherKey: 'postId'
});

db.posts.belongsToMany(db.users, {
  through: db.like,
  foreignKey: 'postId',
  otherKey: 'userId'
});

db.like.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE',
});

db.like.belongsTo(db.posts, {
  foreignKey: 'postId',
  as: 'post',
  onDelete: 'CASCADE',
});
// ----------------------------------------------//

// // Association many to many between like, user and comment
// db.users.belongsToMany(db.posts, {
//   through: db.comment,
//   foreignKey: 'userId',
//   otherKey: 'postId'
// });

// db.posts.belongsToMany(db.users, {
//   through: db.comment,
//   foreignKey: 'postId',
//   otherKey: 'userId'
// });

// db.comment.belongsTo(db.users, {
//   foreignKey: 'userId',
//   as: 'user',
//   onDelete: 'CASCADE',
// });

// db.comment.belongsTo(db.posts, {
//   foreignKey: 'postId',
//   as: 'post',
//   onDelete: 'CASCADE',
// });
// // ----------------------------------------------//

module.exports = db;
