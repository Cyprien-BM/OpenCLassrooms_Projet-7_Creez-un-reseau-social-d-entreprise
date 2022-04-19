const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/post_controllers');
const auth = require('../middleware/token_auth');
const multer = require('../middleware/multer-post');

router.get('/all', auth, postControllers.getAllPost);
router.get('/:id', auth, postControllers.getOnePost);
router.post('/create', auth, multer, postControllers.createAPost);
router.put('/:id', auth, multer, postControllers.modifyAPost);
router.delete('/:id', auth, postControllers.deleteAPost);
router.delete('/image/:id', auth, postControllers.deletePostImage);
router.post('/like/:id', auth, postControllers.likeAPost);

module.exports = router;
