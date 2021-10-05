const User = require('../models/user');

module.exports.getUsers = (req, res) => {
 return User.find({})
    .then(users => res.status(200).send({ users }))
    .catch((err) => {
      console.log('Error:' + err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.getUserById = (req, res) => {
  return User.findById(req.user._id)
    .then((user) => {
      if(user) {
        return res.status(200).send({ data: user });
      }
      return res.status(404).send({message: "404 — Пользователь с указанным _id не найден."});
    })
    .catch((err) => {
      console.log('Error:' + err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => {
      if(err.name == 'ValidationError') {
        return res.status(400).send({message: `${Object.values(err.errors).map(error => error.message).join( )}`})
      }
      console.log('Error:' + err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.updateUser = (req, res) => {

  return User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  )
  .then((user) => {
    if(user) {
      return res.status(200).send({ data: user });
    }
    return res.status(404).send({message: "404 — Пользователь с указанным _id не найден."});
  })
  .catch((err) => {
    if(err.name == 'ValidationError') {
      return res.status(400).send({message: `${Object.values(err.errors).map(error => error.message).join( )}`})
    }
    console.log('Error:' + err);
    res.status(500).send({ message: 'Произошла ошибка' });
  });
}

module.exports.updateUserAvatar = (req, res) => {

  return User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  )
  .then((user) => {
    if(user) {
      return res.status(200).send({ data: user });
    }
    return res.status(404).send({message: "404 — Пользователь с указанным _id не найден."});
  })
  .catch((err) => {
    if(err.name == 'ValidationError') {
      return res.status(400).send({message: `${Object.values(err.errors).map(error => error.message).join( )}`})
    }
    console.log('Error:' + err);
    res.status(500).send({ message: 'Произошла ошибка' });
  });
}