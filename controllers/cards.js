const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  return Card.find({})
    .populate('owner')
    .then(cards => res.status(200).send({ data: cards }))
    .catch((err) => {
      console.log('Error:' + err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.createCards = (req, res) => {
  const ownerId = req.user._id;
  const { name, link, createdAt } = req.body;

  return Card.create({ name, link, createdAt, likes: ownerId, owner: ownerId})
    .then(card => res.status(200).send({ data: card }))
    .catch((err) => {
      if(err.name == 'ValidationError') {
        return res.status(400).send({message: `${Object.values(err.errors).map(error => error.message).join( )}`})
      }
      console.log('Error:' + err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.deleteCards = (req, res) => {
  return Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if(card) {
        return res.status(200).send({ data: card })
      }
      return res.status(404).send({message: "Карточка с указанным _id не найдена."});
    })
    .catch((err) => {
      console.log('Error:' + err);
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

module.exports.likeCard = (req, res) => {
  return  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
  .then(card => res.status(200).send({ data: card }))
  .catch((err) => {
    if(err.name == 'CastError') {
      return res.status(400).send({message: "Переданы некорректные данные для постановки лайка"})
    }
    console.log('Error:' + err);
    res.status(500).send({ message: 'Произошла ошибка' });
  });
}

module.exports.dislikeCard = (req, res) => {
  return  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
  .then(card => res.status(200).send({ data: card }))
  .catch((err) => {
    if(err.name == 'CastError') {
      return res.status(400).send({message: "Переданы некорректные данные для удаления лайка"})
    }
    console.log('Error:' + err);
    res.status(500).send({ message: 'Произошла ошибка' });
  });
}