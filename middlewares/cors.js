const whitelist = [
  'https://last.nomoredomains.work',
  'http://last.nomoredomains.work',
  'localhost:3000',
];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

module.exports = corsOptionsDelegate;
