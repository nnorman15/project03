const { Schema, model } = require('mongoose');
const moment = require('moment');

const cardSchema = new Schema(
  {
    cardText: {
      type: String,
      //required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Card = model('Card', cardSchema);

module.exports = Card;
