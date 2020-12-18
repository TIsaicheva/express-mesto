const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const path = require('path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const notFoundRouter = require('./routes/pageNotFound');

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
    _id: '5fd9b8f54718873630a80ca2',
  };

  next();
});
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', notFoundRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
