const path = require('path');

const readFile = require('../helpers/readFile');

const pathToFile = path.join(__dirname, '..', 'data', 'cards.json');

function getCards(req, res) {
  return readFile(pathToFile)
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send(err));
}

module.exports = getCards;
