const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/index');
const AuthenticationFailedError = require('../errors/AuthenticationFailedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthenticationFailedError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthenticationFailedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
