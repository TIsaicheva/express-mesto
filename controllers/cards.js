const Card = require('../models/card');

const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_ISE = 500;
const ERROR_CODE_NOT_FOUND = 404;
const ValidationError = 'Ошибка валидации.';
const InternalServerError = 'На сервере произошла ошибка.';
const InvalidIdError = 'Невалидный id.';
const IdNotFoundError = 'Нет карточки с таким id.';

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(ERROR_CODE_ISE).send({ message: err.message }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: ValidationError });
      }
      return res.status(ERROR_CODE_ISE).send({ message: InternalServerError });
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const err = new Error();
      err.statusCode = ERROR_CODE_NOT_FOUND;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: InvalidIdError });
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: IdNotFoundError });
      }
      return res.status(ERROR_CODE_ISE).send({ message: InternalServerError });
    });
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .orFail(() => {
      const err = new Error();
      err.statusCode = ERROR_CODE_NOT_FOUND;
      throw err;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: InvalidIdError });
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: IdNotFoundError });
      }
      return res.status(ERROR_CODE_ISE).send({ message: InternalServerError });
    });
}

function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .orFail(() => {
      const err = new Error();
      err.statusCode = ERROR_CODE_NOT_FOUND;
      throw err;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: InvalidIdError });
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: IdNotFoundError });
      }
      return res.status(ERROR_CODE_ISE).send({ message: InternalServerError });
    });
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
