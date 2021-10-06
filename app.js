const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6154a79ebcd27dd18f12131b',
  };

  next();
});

app.use('/', require('./routes/users.js'));
app.use('/', require('./routes/cards.js'));

app.use((req, res) => res.status(404).send({ message: 'Страница не найдена' }));

app.listen(PORT);
