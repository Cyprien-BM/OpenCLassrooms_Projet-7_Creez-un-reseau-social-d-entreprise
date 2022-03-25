const jsonWebToken = require('jsonwebtoken');
require('dotenv').config()

const secretToken = process.env.TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.session.token;
    const decodeToken = jsonWebToken.verify(token, `${secretToken}`);
    const userId = decodeToken.userId;
    if (req.session.userId && req.session.userId !== userId) {
      throw 'User ID non valable'
    }else {
      res.locals.id = userId;
      next();
    }
  }catch(error){
    res.status(403).json({message: '403: unauthorized request'});
  }
}