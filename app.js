const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {
  createUser,
  login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res) => res.status(404).send({ message: 'Страница не найдена' }));

app.listen(PORT);
