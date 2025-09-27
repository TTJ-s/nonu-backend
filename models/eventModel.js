const mongoose = require('mongoose');

const subschema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
});
const eventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    organizer: {
      type: [subschema],
    },
    type: {
      type: String,
      enum: ['online', 'offline'],
    },
    bannerImage: {
      type: String,
    },
    venue: {
      type: String,
    },
    speaker: {
      type: [subschema],
    },
    description: {
      type: String,
    },
    meetLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model('event', eventSchema);

module.exports = eventModel;
