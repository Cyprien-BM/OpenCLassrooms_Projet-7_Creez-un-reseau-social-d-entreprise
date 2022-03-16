const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/post_controllers');
const auth = require('../middleware/token_auth');
const multer = require('../middleware/multer-post');

router.get('/all', auth, postControllers.getAllPost);
router.get('/:id', auth, postControllers.getOnePost);
router.post('/create', auth, postControllers.createAPost);
router.put('/:id', auth, postControllers.modifyAPost);
router.delete('/:id', auth, postControllers.deleteAPost);
router.post('/like/:id', auth, postControllers.likeAPost)


module.exports = router;
