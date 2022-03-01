const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controllers');
const rateLimit = require('express-rate-limit')
const passwordValidator = require('../middleware/password-validator');

// Limiter for IP request
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
  message: "Trop de requêtes HTTP pour cet IP, veuillez réessayer ultérieurement"
});
//----------------------------------------------//

router.post('/signup', passwordValidator, authController.signeUp);
router.post('/login', limiter, passwordValidator, authController.login);

module.exports = router;