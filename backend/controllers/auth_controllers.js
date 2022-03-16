const db = require('../models');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
require('dotenv').config()

const User = db.users;
const token = process.env.TOKEN;

exports.signeUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        email: req.body.email,
        password: hash,
        nickname: req.body.nickname,
        pictureUrl: `${req.protocol}://${req.get('host')}/image/profile/images/Default.png`,
      })
        .then(() => res.status(201).json({message: 'Utilisateur créé'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    },
    raw: true,
  })
  .then(user => {
    if (!user){
      return res.status(401).json({error:'Email non trouvé : Cette utilisateur n\'éxiste pas'});
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({error: 'Mot de passe incorrect !'})
        }
        res.cookie('user', {
          userId: user.idUSER,
          token: jsonWebToken.sign(
            {userId: user.idUSER},
            `${token}`,
            {expiresIn: '24h'}
          ),
          isAdmin: user.isAdmin,
        });
        res.send('Utilisateur connecté');
        // res.status(200).json({
        //   userId: user.idUSER,
        //   token: jsonWebToken.sign(
        //     {userId: user.idUSER},
        //     `${token}`,
        //     {expiresIn: '24h'}
        //   ),
        //   isAdmin: user.isAdmin,
        // });
      })
      .catch(error => res.status(501).json({error}));
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({error});
  })
};

exports.deleteCookie = (req, res, next) => {
  res.clearCookie('user')
  res.send('Cookie supprimé');
} 

