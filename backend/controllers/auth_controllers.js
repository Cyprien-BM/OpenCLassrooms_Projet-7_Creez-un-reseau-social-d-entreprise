const db = require('../models');

const User = db.users;

exports.signeUp = (req, res, next) => {
  User.create({
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
  })
  .then(() => res.status(201).json({message: 'Utilisateur créé'}))
  .catch(error => res.status(400).json({error}));
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
