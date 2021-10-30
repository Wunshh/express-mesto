// Массив доменов, с которых разрешены кросс-доменные запросы
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
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};

module.exports = allowCrossDomain;

// const allowCrossDomain = (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://last.nomoredomains.work');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//   if (req.method === 'OPTIONS') {
//     res.send(200);
//   } else {
//     next();
//   }
// };
