const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config()
const bodyParser = require('body-parser');
const helmet = require('helmet');

const User = process.env.DB_USER;
const Password = process.env.DB_PASSWORD;

const sequelize = new Sequelize("groupomania", `${User}`, `${Password}`, {
  dialect: "mysql",
  host: "localhost"
});
try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/image/gif', express.static('gif'));
app.use('/image/images', express.static('images'));

// app.use('/api/auth', authRoutes);
// app.use('/api/post', postRoutes);

module.exports = app;