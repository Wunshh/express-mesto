const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/index');
const AuthenticationFailedError = require('../errors/AuthenticationFailedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthenticationFailedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
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
