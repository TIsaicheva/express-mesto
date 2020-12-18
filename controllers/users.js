const User = require('../models/user');

const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_ISE = 500;
const ERROR_CODE_NOT_FOUND = 404;
const ValidationError = 'Ошибка валидации.';
const InternalServerError = 'На сервере произошла ошибка.';
const InvalidIdError = 'Невалидный id.';
const IdNotFoundError = 'Нет пользователя с таким id.';

function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(ERROR_CODE_ISE).send({ message: err.message }));
}

function getUSerProfile(req, res) {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const err = new Error();
      err.statusCode = ERROR_CODE_NOT_FOUND;
      throw err;
    })
    .then((user) => {
      res.status(200).send(user);
    })
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

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: ValidationError });
      }
      return res.status(ERROR_CODE_ISE).send({ message: InternalServerError });
    });
}

function updateProfile(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: InvalidIdError });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: ValidationError });
      }
      return res.status(ERROR_CODE_ISE).send({ message: InternalServerError });
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: InvalidIdError });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: ValidationError });
      }
      return res.status(ERROR_CODE_ISE).send({ message: InternalServerError });
    });
}

module.exports = {
  getUsers, getUSerProfile, createUser, updateProfile, updateAvatar,
};
