const options = {
  origin: [
    'http://localhost:3000',
    'https://last.nomoredomains.work',
    'http://last.nomoredomains.work',
    'https://Wunshh.github.io',
    'https://api.last.nomoredomains.work',
    'http://api.last.nomoredomains.work',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = options;
