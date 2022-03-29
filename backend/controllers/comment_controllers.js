const db = require('../models');
const asyncLib = require('async');
const fs = require('fs');

const Post = db.posts;
const User = db.users;
const Like = db.like;
const Comment = db.comment;

exports.getCommentsFromAPost = (req, res, next) => {
  Comment.findAll({
    where: {
      idPOSTS: req.params.id,
    },
    include: [
      {
        model: db.users,
        attributes: ['nickname', 'idUSER'],
      },
    ]
  })
  .then((comments) => res.status('200').json(comments))
  .catch(() => res.status(500).json({ message: 'Aucun commentaire trouvé' }));
};

exports.createComment = (req, res, next) => {
  
}