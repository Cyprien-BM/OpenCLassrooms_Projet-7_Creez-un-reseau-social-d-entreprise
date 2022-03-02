const db = require('../models');
const bcrypt = require('bcrypt');
const multer = require('../middleware/multer-profile');
const fs = require('fs');

const User = db.users;

exports.getUser = (req, res, next) => {
  User.findOne({
    where: {
      idUSER: res.locals.id
    },
    raw: true,
  })
  .then (user => res.status(200).json(user))
  .catch (error => res.status(400).json({error}));
}

exports.deleteUser = (req, res, next) => {
  User.destroy({
    where: {
      idUSER: res.locals.id
    }
  })
  .then(() => res.status(201).json({message: 'Utilisateur Supprimé'}))
  .catch(error => res.status(500).json({error}));
}

exports.modifyEmail = (req, res, next) => {
  User.findOne({
    where: {
      idUSER: res.locals.id
    }
  })
    .then ( user => {
      user.update({
        email: req.body.email
      })
        .then (() => res.status(200).json({message : 'Email modifié !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}

exports.modifyPassword = (req, res, next) => {
  User.findOne({
    where: {
      idUSER: res.locals.id
    }
  })
    .then (user => {
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        user.update({
          password: hash
        })
          .then (() => res.status(200).json({message : 'Mots de passe modifié !'}))
          .catch(error => res.status(400).json({error}));
      })
      .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}

exports.modifyUserInformation = (req, res, next) => {
  User.findOne({
    where: {
      idUSER: res.locals.id
    },
    raw: true,
  })
  .then(() => {
    let imgUrl;
    if (req.file) {
      const fileName = pictureUrl.split('/images/')[1];
      if (fileName != "Default.png") {
        fs.unlink(`image/profile/images/${fileName}`, (error) => {error})
      }
      imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } else {
      imgUrl = req.body.pictureUrl;
    }
    User.update({
      nickname: req.body.nickname,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pictureUrl: imgUrl,
    },{
      where: {
        idUSER: res.locals.id
      }
    })
    .then (() => res.status(200).json({message : 'Profil modifié !'}))
    .catch(error => res.status(400).json({error}));
  })
  .catch(error => res.status(500).json({error}));
}