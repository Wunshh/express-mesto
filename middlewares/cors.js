const allowedCors = [
  'https://last.nomoredomains.work',
  'http://last.nomoredomains.work',
  'localhost:3000',
];

const allowCrossDomain = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }
  next();
};

module.exports = allowCrossDomain;
