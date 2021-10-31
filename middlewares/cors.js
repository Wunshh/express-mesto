const allowedCors = [
  'https://last.nomoredomains.work',
  'http://last.nomoredomains.work',
  'localhost:3000',
  'localhost:5000',
];

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedCors);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};

module.exports = allowCrossDomain;
