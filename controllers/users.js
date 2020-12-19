const User = require('../models/user');

const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_ISE,
  ERROR_CODE_NOT_FOUND,
  VALIDATION_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  INVALID_ID_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
} = require('../utils/constants');

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
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: INVALID_ID_ERROR_MESSAGE });
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: USER_NOT_FOUND_ERROR_MESSAGE });
      }
      return res.status(ERROR_CODE_ISE).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: VALIDATION_ERROR_MESSAGE });
      }
      return res.status(ERROR_CODE_ISE).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
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
    },
  )
    .orFail(() => {
      const err = new Error();
      err.statusCode = ERROR_CODE_NOT_FOUND;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: INVALID_ID_ERROR_MESSAGE });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: VALIDATION_ERROR_MESSAGE });
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: USER_NOT_FOUND_ERROR_MESSAGE });
      }
      return res.status(ERROR_CODE_ISE).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      const err = new Error();
      err.statusCode = ERROR_CODE_NOT_FOUND;
      throw err;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: INVALID_ID_ERROR_MESSAGE });
      }
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: VALIDATION_ERROR_MESSAGE });
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: USER_NOT_FOUND_ERROR_MESSAGE });
      }
      return res.status(ERROR_CODE_ISE).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    });
}

module.exports = {
  getUsers, getUSerProfile, createUser, updateProfile, updateAvatar,
};
