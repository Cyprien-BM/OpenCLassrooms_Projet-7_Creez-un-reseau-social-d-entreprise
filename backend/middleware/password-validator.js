const passwordSchema = require('../models/passwords');

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res
      .status(400)
      .json({
        error:
          'Le mot de passe doit contenir entre 8 et 64 caratères avec au moins 1 minuscule, 1 majuscule, 2 chiffres et 1 caractères spécial',
      });
  } else {
    next();
  }
};
