const User = require('../models/user');

module.exports.getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send({ users }))
  .catch((err) => {
    console.log(`Error:${err}`);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  });

module.exports.getUserById = (req, res) => User.findById(req.params.userId)
  .then((user) => {
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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join()}` });
      }
      console.log(`Error:${err}`);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => User.findByIdAndUpdate(req.user._id,
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
      return res.status(200).send({ data: user });
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

module.exports.updateUserAvatar = (req, res) => User.findByIdAndUpdate(req.user._id,
  {
    avatar: req.body.avatar,
  },
  {
    new: true,
    runValidators: true,
  })
  .then((user) => {
    if (user) {
      return res.status(200).send({ data: user });
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
