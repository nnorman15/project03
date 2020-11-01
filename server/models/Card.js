const { Schema, model } = require('mongoose');
const moment = require('moment');

const cardSchema = new Schema(
  {
    cardTitle: {
      type: String,
      required: 'Title is required.',
      minlength: 1,
      maxlength: 50
    },
    cardBody: {
      type: String,
      required: 'Body is required.',
      minlength: 1,
      maxlength: 500
    },
    cardSubject: {
      type: String,
      required: 'Subject is required.',
      minlength: 1,
      maxlength: 100
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => moment(timestamp).format('MMM Do, YYYY [at] hh:mm a')
    },
    email: {
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
