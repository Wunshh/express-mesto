// const allowedCors = [
//   'https://last.nomoredomains.work',
//   'http://last.nomoredomains.work',
//   'localhost:3000',
// ];

// const cors = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const requestHeaders = req.headers['access-control-request-headers'];

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//   next();
// };

// module.exports = cors;
