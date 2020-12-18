const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const regexp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g;
        return regexp.test(v);
      },
      message: (props) => `${props.value} is not a valid code format!`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
