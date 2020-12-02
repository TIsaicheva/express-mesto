const fsPromises = require('fs').promises;

function readDataFromFile(pathToFile) {
  return fsPromises.readFile(pathToFile, { encoding: 'utf-8' })
    .then((data) => JSON.parse(data))
    .catch((err) => { throw err; });
}

module.exports = readDataFromFile;
