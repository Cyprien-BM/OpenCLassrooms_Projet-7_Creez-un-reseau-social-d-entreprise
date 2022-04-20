const db = require('../models');
const fs = require('fs');

const Comment = db.comment;

exports.getCommentsFromAPost = (req, res, next) => {
  Comment.findAll({
    include: [
      {
        model: db.users,
        attributes: ['nickname', 'idUSER', 'pictureUrl'],
      },
    ],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => {
      res.status(500).json({ message: 'Aucun commentaire trouvé' });
    });
};

exports.createComment = (req, res, next) => {
  let fileURL = null;
  if (req.file) {
    fileURL = `${req.protocol}://${req.get('host')}/image/posts/images/${
      req.file.filename
    }`;
  }
  Comment.create({
    userId: res.locals.id,
    postId: req.params.id,
    content: req.body.content,
    imageUrl: fileURL,
  })
    .then(() => res.status(201).json({ message: 'Commentaire créé' }))
    .catch((error) => {
      if (req.file) {
        fs.unlink(`image/posts/images/${req.file.filename}`, (error) => {
          error;
        });
      }
      res.status(500).json({ error });
    });
};

exports.modifyComment = (req, res, next) => {
  Comment.findOne({
    where: {
      commentId: req.params.id,
    },
  })
    .then((comment) => {
      // Check whether the image changes or not
      let fileURL;
      if (req.file && comment.imageUrl != null) {
        const fileName = comment.imageUrl.split('/images/')[1];
        fs.unlink(`image/posts/images/${fileName}`, (error) => {
          error;
        });
        fileURL = `${req.protocol}://${req.get('host')}/image/posts/images/${
          req.file.filename
        }`;
      } else if (req.file && comment.imageUrl == null) {
        fileURL = `${req.protocol}://${req.get('host')}/image/posts/images/${
          req.file.filename
        }`;
      } else {
        fileURL = comment.imageUrl;
      }
      comment
        .update({
          content: req.body.content,
          imageUrl: fileURL,
        })
        .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({ message: 'Commentaire introuvable !' });
    });
};

exports.deleteComment = (req, res, next) => {
  Comment.findOne({
    where: {
      commentId: req.params.id,
    },
  })
    .then((comment) => {
      if (comment.imageUrl != null) {
        const fileName = comment.imageUrl.split('/images/')[1];
        fs.unlink(`image/posts/images/${fileName}`, (error) => {
          error;
        });
      }
      comment
        .destroy()
        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
        .catch((error) =>
          res
            .status(400)
            .json({ message: 'Impossible de supprimer le commentaire' })
        );
    })
    .catch(() =>
      res.status(500).json({ message: 'Commentaire introuvable !' })
    );
};

exports.deleteImageComment = (req, res, next) => {
  Comment.findOne({
    where: {
      commentId: req.params.id,
    },
  })
    .then((comment) => {
      let oldImageUrl = comment.imageUrl;
      comment
        .update({
          imageUrl: null,
        })
        .then(() => {
          if (oldImageUrl != null) {
            const fileName = oldImageUrl.split('/images/')[1];
            fs.unlink(`image/posts/images/${fileName}`, (error) => {
              error;
            });
          }
          res.status(200).json({ message: 'Image supprimé' });
        })
        .catch((error) => {
          res.status(400).json(error)});
    })
    .catch(() =>
      res.status(500).json({ message: 'Commentaire introuvable !' })
    );
};
