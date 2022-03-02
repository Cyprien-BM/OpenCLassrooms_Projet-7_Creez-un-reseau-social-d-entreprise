const jsonWebToken = require('jsonwebtoken');
require('dotenv').config()

const secretToken = process.env.TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodeToken = jsonWebToken.verify(token, `${secretToken}`);
    const userId = decodeToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable'
    }else {
      res.locals.id = userId;
      next();
    }
  }catch(error){
    res.status(403).json({message: '403: unauthorized request'});
  }
}