const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/post_controllers');
const auth = require('../middleware/token_auth');
const multer = require('../middleware/multer-post');

router.get('/', auth, postControllers.getAllPost);
// router.get('/:id', auth, postControllers.getOnePost)
router.post('/:id', auth, postControllers.postAPost)

module.exports = router;
