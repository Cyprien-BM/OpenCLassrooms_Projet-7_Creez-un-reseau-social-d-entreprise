const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/post_controllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-post');

router.get('/', saucesControllers.getSauces);
router.get('/:id', auth, saucesControllers.getOneSauces);
router.post('/', auth, inputValidator,  multer, saucesControllers.createSauce);
router.put('/:id', auth, inputValidator, multer, saucesControllers.modifySauce);
router.delete('/:id', auth, saucesControllers.deleteSauce);
router.post('/:id/like', auth, saucesControllers.like);

module.exports = router;
