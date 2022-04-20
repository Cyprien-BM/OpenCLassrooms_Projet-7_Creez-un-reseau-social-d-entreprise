const db = require('../models');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const session = require('express-session');
require('dotenv').config();

const User = db.users;
const token = process.env.TOKEN;

exports.signeUp = (req, res, next) => {
  User.findAll()
    .then((users) => {
      if (users.length === 0) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            User.create({
              email: req.body.email,
              password: hash,
              nickname: req.body.nickname,
              pictureUrl: `${req.protocol}://${req.get(
                'host'
              )}/image/profile/Default.png`,
              isAdmin: true,
            })
              .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            User.create({
              email: req.body.email,
              password: hash,
              nickname: req.body.nickname,
              pictureUrl: `${req.protocol}://${req.get(
                'host'
              )}/image/profile/Default.png`,
            })
              .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

  // bcrypt
  //   .hash(req.body.password, 10)
  //   .then((hash) => {
  //     User.create({
  //       email: req.body.email,
  //       password: hash,
  //       nickname: req.body.nickname,
  //       pictureUrl: `${req.protocol}://${req.get(
  //         'host'
  //       )}/image/profile/Default.png`,
  //     })
  //       .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
  //       .catch((error) => res.status(400).json({ error }));
  //   })
  // .catch((error) => res.status(500).json({ error }));

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
    raw: true,
  })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Email non trouvé : Cette utilisateur n'éxiste pas" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          req.session.isAdmin = user.isAdmin;
          req.session.userId = user.idUSER;
          req.session.token = jsonWebToken.sign(
            { userId: user.idUSER },
            `${token}`,
            { expiresIn: '24h' }
          );
          res.send('Utilisateur connecté');
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.logOut = (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('Session terminée');
};
