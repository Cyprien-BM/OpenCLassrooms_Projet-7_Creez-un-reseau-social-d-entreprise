const db = require('../models');
const bcrypt = require('bcrypt');

const User = db.users;

exports.signeUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        email: req.body.email,
        password: hash,
        nickname: req.body.nickname,
        isAdmin : true,
      })
        .then(() => res.status(201).json({message: 'Utilisateur créé'}))
        .catch(error => res.status(400).json({error}));
    })
  .catch(error => res.status(500).json({error}));
}

exports.deleteUser = (req, res, next) => {
  User.destroy({
    where: {
      idUSERS: req.body.idUser
    }
  })
  .then(() => res.status(201).json({message: 'Utilisateur Supprimé'}))
  .catch(error => res.status(400).json({error}));
}
