const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/comment_controllers');
const auth = require('../middleware/token_auth');
const multer = require('../middleware/multer-post');

router.get('/', auth, commentControllers.getCommentsFromAPost);
router.post('/create/:id', auth, multer, commentControllers.createComment);
router.put('/:id', auth, multer, commentControllers.modifyComment);
router.delete('/:id', auth, commentControllers.deleteComment);
router.delete('/image/:id', auth, commentControllers.deleteImageComment);

module.exports = router;
