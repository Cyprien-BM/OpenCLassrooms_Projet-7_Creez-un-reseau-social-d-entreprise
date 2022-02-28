const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config()

const db = {};

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

const sequelize = new Sequelize(`${dbDatabase}`, `${dbUser}`, `${dbPassword}`, {
  dialect: "mysql",
  host: "localhost"
});
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

// add all associations
Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});


db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./users-model')(sequelize, Sequelize);
db.posts = require('./posts-model')(sequelize, Sequelize);

// Association one to many between user and post
db.users.hasMany(db.posts, {
  foreignKey: {
    name: 'postIdUSERS',
    allowNull: false,
  }
});
db.posts.belongsTo(db.users);
//----------------------------------------------//

module.exports = db;