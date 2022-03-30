const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controllers');
const passwordValidator = require('../middleware/password-validator');
const multer = require('../middleware/multer-profile');
const tokenAuth = require('../middleware/token_auth');

router.get('/user', tokenAuth, profileController.getUser);
router.get('/user/:id', tokenAuth, profileController.getUserById)
router.get('/like', tokenAuth, profileController.getUserLike)
router.delete('/delete/:id', tokenAuth, profileController.deleteUser);
router.put('/password', tokenAuth, passwordValidator, profileController.modifyPassword)
router.put('/modify', tokenAuth, multer, profileController.modifyUserInformation)

module.exports = router;
