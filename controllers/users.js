const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  JWT_SECRET,
  SOLT_ROUND,
} = require('../configs/index');

module.exports.getUsers = (req, res) => {
  User.find({}).then((users) => res.status(200).send({ users }))
    .catch((err) => {
      console.log(`Error:${err}`);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId).then((user) => {
    if (user) {
      return res.status(200).send({ data: user });
    }
    return res.status(404).send({ message: '404 — Пользователь с указанным _id не найден.' });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан невалидный _id' });
      }
      console.log(`Error:${err}`);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id).then((user) => {
    if (user) {
      return res.status(200).send({ data: user });
    }
    return res.status(404).send({ message: '404 — Пользователь с указанным _id не найден.' });
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Передан невалидный _id' });
      }
      console.log(`Error:${err}`);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email,
  } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(409).send({ message: 'Пользователь с данным email уже зарегистрирован' });
    }
    bcrypt.hash(req.body.password, SOLT_ROUND).then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then(() => res.status(200).send({ message: 'Вы успешно зарегистрировались' }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join()}` });
        }
        console.log(`Error:${err}`);
        return res.status(500).send({ message: 'На сервере произошла ошибка' });
      }));
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Переданы невалидные данные' });
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(401).send({ message: 'Неправильные почта или пароль' });
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return res.status(401).send({ message: 'Неправильные почта или пароль' });
      }
      res.cookie('jwt', JWT_SECRET, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .send({ _id: user._id });
    })
      .catch((err) => {
        console.log(`Error:${err}`);
        return res.status(401).send({ message: 'Неправильные почта или пароль' });
      });
  });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user._id });
      }
      return res.status(404).send({ message: '404 — Пользователь с указанным _id не найден.' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join()}` });
      }
      console.log(`Error:${err}`);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user._id });
      }
      return res.status(404).send({ message: '404 — Пользователь с указанным _id не найден.' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join()}` });
      }
      console.log(`Error:${err}`);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};
