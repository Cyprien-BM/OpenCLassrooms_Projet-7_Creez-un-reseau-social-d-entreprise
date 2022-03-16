const db = require('../models');
const asyncLib = require('async');

const Post = db.posts
const User = db.users;
const Like = db.like;

exports.getAllPost = (req, res, next) => {
  Post.findAll({
  include: [{
    model: db.users,
    attributes: ['nickname', 'idUSER']
    }]
  })
    .then (posts => res.status(200).json(posts))
    .catch(() => res.status(500).json({message: 'Aucun post trouvé'}));
}

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: {
      idPOSTS: req.params.id
    },
    include : [{
      model: db.users,
      attributes: ['nickname', 'idUSER']
    }]
  })
    .then (post => res.status(200).json(post))
    .catch(() => res.status(500).json({message: 'Post introuvable !'}));
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
  .catch((error) => res.status(400).json({error}));
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
    post.update({
      title: req.body.title,
      content: req.body.content,
      imageUrl: fileURL,
    })
    .then(() => res.status(200).json({message: 'Post modifié !'}))
    .catch(error => res.status(400).json({error}));
  })
  .catch(() => res.status(500).json({message: 'Post introuvable !'}));
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
  .catch(() => res.status(500).json({message: 'Post introuvable !'}));
}

exports.likeAPost = (req, res, next) => {
  
  asyncLib.waterfall([
    function (callback) {
      Post.findOne({
        where: {
          idPOSTS: req.params.id
        }
      })
      .then(post => {
        callback(null, post);
      })
      .catch(() => {
        return res.status(500).json({message: 'Impossible de récupéré le post'});
      });
    },
    function (post, callback) {
      if(post) {
        User.findOne({
          where: {
            idUSER: post.userId
          }
        })
        .then(user => {
          callback(null, post, user);
        })
        .catch(() => {
          return res.status(500).json({message: 'Impossible de récupéré l\'utilisateur'});
        });
      } else {
      res.status(404).json({message: 'Post introuvable'});
      }
    },
    function(post, user, callback) {
      if(user) {
        Like.findOne({
          where: {
            postId: post.idPOSTS,
            userId: user.idUSER
          }
        })
        .then(like => {
          callback(null, post, user, like)
        })
        .catch(() => {
          return res.status(500).json({message: 'Impossible de récupéré les likes'});
        })
      } else {
        res.status(404).json({message: 'Utilisateur introuvable'});
      }
    },
    function(post, user, like, callback) {
      if (!like && req.body.likeValue != 0) {
        Like.create({
          likeValue: req.body.likeValue,
          postId: post.idPOSTS,
          userId: user.idUSER,
        })
        .then(() => {
          callback(null, post)
        })
        .catch(() => {
          return res.status(500).json({message: 'Impossible de creer le like ou dislike'});
        });
      } else if (like && req.body.likeValue == 0) {
        like.destroy()
        .then(() => {
          callback(null, post)
        })
        .catch(() => {
          return res.status(500).json({message: 'Impossible de supprimer le like ou dislike'});
        });
      } else {
        res.status(409).json({message: 'Post déjà liké ou disliké par l\'utilisateur'});
      }
    },
    function(post, callback) {
      Like.count({
        where: {
          likeValue: 1,
          postId: post.idPOSTS
        }
      })
      .then(likes => {
        Like.count({
          where: {
            likeValue: -1,
            postId: post.idPOSTS,
          }
        })
        .then(dislikes => {
          let totalLikes = likes - dislikes;
          callback(null, post, totalLikes);
        })
        .catch(() => {
          return res.status(500).json({message: 'Impossible récuperer les dislikes'});
        })
      })
      .catch(() => {
        return res.status(500).json({message: 'Impossible récuperer les likes'});
      })
    },
    function(post, totalLikes, callback) {
      post.update({
        likes: totalLikes
      })
      .then(() => {
        callback(post);
      })
      .catch(() => {
        res.status(500).json({message: 'Impossible de mettre à jour les likes du post'})});
    }
  ], function(post) {
    if (post) {
      return res.status(201).json(post);
    } else {
      return res.status(500).json({message : 'Impossible de mettre à jour le pots'});
    }
  });
}
