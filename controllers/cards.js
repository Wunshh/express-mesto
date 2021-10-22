const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

module.exports.createCards = (req, res, next) => {
  const ownerId = req.user._id;
  const { name, link, createdAt } = req.body;

  return Card.create({
    name, link, createdAt, likes: ownerId, owner: ownerId,
  })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы невалидные данные');
      }
      next(err);
    });
};

module.exports.deleteCards = (req, res, next) => {
  Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      }
      res.status(403).send({ message: 'Попытка удалить чужую карточку' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Передан невалидный _id');
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) {
      return res.status(200).send({ data: card });
    }
    throw new NotFoundError('Карточка с указанным _id не найдена.');
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('Переданы некорректные данные для постановки лайка');
    }
    return next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) {
      return res.status(200).send({ data: card });
    }
    throw new NotFoundError('Карточка с указанным _id не найдена.');
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('Переданы некорректные данные для удаления лайка');
    }
    next(err);
  });
