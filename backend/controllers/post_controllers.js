const db = require('../models');

const Post = db.posts

exports.getAllPost = (req, res, next) => {
  Post.findAll({
  include: [{
    model: db.users,
    attributes: ['nickname']
    }]
  })
    .then (posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({error}));
}

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: {
      idPOSTS: req.params.id
    },
    include : [{
      model: db.users,
      attributes: ['nickname']
    }]
  })
    .then (post => {
      if (post == null) {
        res.status(404).json({message: 'Post introuvable'})
      }
      res.status(200).json(post)
    })
    .catch(error => res.status(500).json({error}));
}

exports.createAPost = (req, res, next) => {
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

exports.modifyAPost = (req, res, next) => {
  Post.findOne({
    where: {
      idPOSTS: req.params.id
    }
  })
    .then((post) => {
      // Check whether the image changes or not
      let fileURL;
      if (req.file && post.imageUrl != null) {
        const fileName = pictureUrl.split('/images/')[1];
        fs.unlink(`image/profile/images/${fileName}`, (error) => {error})
        fileURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } else if (req.file && post.imageUrl == null) {
        fileURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } else {
        fileURL = post.imageUrl;
      }
      Post.update({
        title: req.body.title,
        content: req.body.content,
        imageUrl: fileURL,
      }, {
        where: {
          idPOSTS: req.params.id
        }
      })
        .then(() => res.status(200).json({message: 'Post modifié !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}

exports.deleteAPost = (req, res, next) => {
  Post.findOne({
    where: {
      idPOSTS: req.params.id
    }
  })
    .then(post => {
      if (post.imageUrl != null) {
        const fileName = post.imageUrl.split('/images/')[1];
        fs.unlink(`image/profile/images/${fileName}`, (error) => {error})
      }
      post.destroy()
        .then(() => res.status(200).json({message : 'Post supprimé'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}