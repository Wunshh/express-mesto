const allowedCors = [
  'https://last.nomoredomains.work',
  'http://last.nomoredomains.work',
  'localhost:3000',
  'localhost:5000',
];

const allowCrossDomain = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin, 'Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders, 'Access-Control-Allow-Credentials', 'true');
    return res.end();
  }
  next();
};

module.exports = allowCrossDomain;
