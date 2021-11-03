const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    console.log({ message: 'что-то не так' });
  }
  next();
};

module.exports = allowCrossDomain;
