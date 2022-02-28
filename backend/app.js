const express = require('express');
const Sequelize = require("sequelize")
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./models');
const authRoutes = require('./routes/auth_routes');

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

app.use('/image/posts/gif', express.static('gif'));
app.use('/image/posts/images', express.static('images'));
app.use('/image/profile/images', express.static('images'));

app.use('/api/auth', authRoutes);
// app.use('/api/post', postRoutes);


// const Post = db.posts;

// app.use((req, res, next) => {
//   User.create({
//     email: req.body.email,
//     password: req.body.password,
//     nickname: req.body.nickname,
//     isAdmin: true
//   })
//   .then(() => res.status(201).json({message: 'Utilisateur créé'}))
//   .catch(error => res.status(400).json({error}));
// })



module.exports = app;