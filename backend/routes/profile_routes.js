const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controllers');
const passwordValidator = require('../middleware/password-validator');
const multer = require('../middleware/multer-profile');
const tokenAuth = require('../middleware/token_auth');

router.get('/:id', tokenAuth, profileController.getUser)
router.delete('/:id', tokenAuth, profileController.deleteUser);
router.put('/email/:id', tokenAuth, profileController.modifyEmail);
router.put('/password/:id', tokenAuth, passwordValidator, profileController.modifyPassword)
router.put('/:id', tokenAuth, profileController.modifyUserInformation)

module.exports = router;