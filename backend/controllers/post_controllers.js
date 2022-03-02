const db = require('../models');

const Post = db.posts

exports.getAllPost = (req, res, next) => {
  Post.findAll({
    // raw: true,
  include: [{
    model: db.users,
    attributes: ['nickname']
    }]
  })
    .then (posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({error}));
}

exports.postAPost = (req, res, next) => {
  let fileURL = null;
  if (req.file) {
    fileURL = `${req.protocol}://${req.get('host')}/image/posts/images/${req.file.filename}`
  }
  Post.create({
    title: req.body.title,
    content: req.body.content,
    userId: res.locals.id,
    imageUrl: fileURL,
  })
  .then(() => res.status(201).json({message: 'Post créé'}))
  .catch(error => res.status(400).json({error}));
}

