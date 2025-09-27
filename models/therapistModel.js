const mongoose = require('mongoose');

const subschema = new mongoose.Schema({
  day: {
    type: String,
  },
  time: {
    type: Date,
  },
});
const therapistSchema = mongoose.Schema(
  {
    therapistName: {
      type: String,
    },
    qualification: {
      type: String,
    },
    experience: {
      type: Number,
    },
    specialization: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    uid: {
      type: String, // ? isPhone verified (firebaseId)
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'rejected', 'accepted'],
    },
    password: {
      type: String,
    },
    isIntake: {
      type: Boolean, // ?checking this therapist is available for intake sessions
      default: false,
    },
    times: {
      type: [subschema],
    },
    img: {
      type: String,
    },
    amount: {
      type: Number,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const therapistModel = mongoose.model('therapist', therapistSchema);

module.exports = therapistModel;
