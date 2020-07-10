const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        const regExp = /^https?:\/\/(www\.)?\w+(-\w+)*(\.\w+(-\w+)*)*(\/.+)*/;
        return regExp.test(value);
      },
      message: 'введите URL в формате: http://my-site.ru/...',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
