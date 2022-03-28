const db = require('../models');
const bcrypt = require('bcrypt');
const multer = require('../middleware/multer-profile');
const fs = require('fs');

const User = db.users;
const Post = db.posts;

exports.getUser = (req, res, next) => {
  User.findOne({
    where: {
      idUSER: res.locals.id,
    },
    raw: true,
  })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(400).json({ error }));
};

exports.getUserById = (req, res, next) => {
  User.findOne({
    where: {
      idUSER: req.params.id,
    },
    raw: true,
  })
    .then((user) => {res.status(200).json({user, otherUser: true})})
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPassword = (req, res, next) => {
  User.findOne({
    where: {
      idUSER: res.locals.id,
    },
  })
    .then((user) => {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          user
            .update({
              password: hash,
            })
            .then(() =>
              res.status(200).json({ message: 'Mots de passe modifié !' })
            )
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyUserInformation = (req, res, next) => {
  console.log('ici');
  console.log(req.body);
  console.log(req.file);
  User.findOne({
    where: {
      idUSER: res.locals.id,
    },
    raw: true,
  })
    .then((user) => {
      console.log(user.pictureUrl);
      let imgUrl;
      if (req.file) {
        const fileName = user.pictureUrl.split('/images/')[1];
        if (fileName != 'Default.png') {
          fs.unlink(`image/profile/images/${fileName}`, (error) => {
            error;
          });
        }
        imgUrl = `${req.protocol}://${req.get('host')}/image/profile/images/${
          req.file.filename
        }`;
      } else {
        imgUrl = req.body.pictureUrl;
      }
      User.update(
        {
          nickname: req.body.nickname,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          pictureUrl: imgUrl,
          email: req.body.email,
        },
        {
          where: {
            idUSER: res.locals.id,
          },
        }
      )
        .then(() => res.status(200).json({ message: 'Profil modifié !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.deleteUser = (req, res, next) => {
  User.findOne({
    where: {
      idUSER: req.params.id,
    },
  })
    .then(async (user) => {
      const fileName = user.pictureUrl.split('/images/')[1];
      if (fileName != 'Default.png') {
        fs.unlink(`image/profile/images/${fileName}`, (error) => {
          error;
        });
      }
      
      // Find all posts related to the user and delete all image file associated to them before cascade deletion
      await Post.findAll({
        where: {
          userId: req.params.id,
        },
      })
        .then((posts) => {
          for (const post of posts) {
            console.log('pendant');
            if (post.imageUrl != null) {
              const fileName = post.imageUrl.split('/images/')[1];
              fs.unlinkSync(`image/profile/images/${fileName}`, (error) => {
                error;
              });
            }
          }
        })
        .catch((error) => res.status(502).json({ error }));

      // Delete user
      User.destroy({
        where: {
          idUSER: req.params.id,
        },
      })
        .then(() => {
          req.session.destroy();
          res.clearCookie('connect.sid');
          res.status(201).json({ message: 'Utilisateur Supprimé' })})
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error });
        });
    })
    .catch((error) => res.status(502).json({ error }));
};
