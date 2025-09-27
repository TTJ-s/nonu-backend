const mongoose = require('mongoose');

const eventAttendSchema = mongoose.Schema(
  {
    eventId: {
      type: String,
      ref: 'event',
    },
    userId: {
      type: String,
      ref: 'user',
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const eventAttendModel = mongoose.model('attend', eventAttendSchema);

module.exports = eventAttendModel;
