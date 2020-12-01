const path = require('path');
const readFile = require('../helpers/readFile');

const pathToFile = path.join(__dirname, '..', 'data', 'users.json');

function getUsers(req, res) {
  return readFile(pathToFile)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send(err));
}

function getUSerProfile(req, res) {
  return readFile(pathToFile)
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }

      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send(err));
}

module.exports = { getUsers, getUSerProfile };
