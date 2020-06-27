const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const urlNotFound = (req, res) => {
  if (!res.headersSent) {
    res.status(404).send({
      message: 'Запрашиваемый ресурс не найден',
    });
  }
};

app.use((req, res, next) => {
  req.user = {
    _id: '5ef76509f60508374b5c98b8',
  };

  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', cardsRoute);

app.use('/users', usersRoute);

app.use(urlNotFound);
app.listen(PORT);
