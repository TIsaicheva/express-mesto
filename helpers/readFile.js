const fsPromises = require('fs').promises;

function readDataFromFile(pathToFile) {
  return fsPromises.readFile(pathToFile, { encoding: 'utf-8' })
    .then((data) => JSON.parse(data))
    .catch((err) => JSON.stringify({ status: 500, message: err.message }));
}

module.exports = readDataFromFile;
