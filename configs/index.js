const SOLT_ROUND = 10;
const crypto = require('crypto');

const JWT_SECRET = crypto.randomBytes(16).toString('hex');

module.exports = {
  SOLT_ROUND,
  JWT_SECRET,
};
