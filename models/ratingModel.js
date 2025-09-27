const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'user',
    },
    therapistId: {
      type: String,
      ref: 'therapist',
    },
    sessionId: {
      type: String,
      ref: 'session',
    },
    rate: {
      type: Number,
      validate: {
        validator(value) {
          return value >= 1 && value <= 5;
        },
        message: 'Rating must be between 1 and 5.',
      },
    },
  },
  {
    timestamps: true,
  }
);

const ratingModel = mongoose.model('rating', ratingSchema);

module.exports = ratingModel;
