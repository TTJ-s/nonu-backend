const mongoose = require('mongoose');

const { Schema } = mongoose;

const subschema = new mongoose.Schema({
  sessionDate: {
    type: String,
  },
  sessionTime: {
    type: String,
  },
  status: {
    type: String, // ?  progress, accepted, cancelled, completed
    default: 'progress',
  },
});
const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'user',
    },
    sessionDate: {
      type: Date,
    },
    sessionTime: {
      type: Date,
    },
    amount: {
      type: Number,
    },
    remark: {
      type: String,
    },
    status: {
      type: String, // ?  progress, accepted, cancelled, completed
      default: 'progress',
    },
    paymentCompleted: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String, // ? feteched from payment db
      ref: 'payment',
    },
    therapistId: {
      type: String,
      ref: 'therapist',
    },
    meetLink: {
      type: String,
    },
    sessionReschedule: {
      type: [subschema], // ? for reschedule session
    },
    report: {
      type: String,
    },
    recommendedTherapist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'therapist',
      },
    ],
    isInTake: {
      type: Boolean, // ? check if it is intake or not
    },
  },
  {
    timestamps: true,
  }
);

const sessionModel = mongoose.model('session', sessionSchema);
module.exports = sessionModel;
