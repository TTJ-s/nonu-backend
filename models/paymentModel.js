const mongoose = require('mongoose');

const paymentScheme = mongoose.Schema(
  {
    razorpayId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    entity: {
      type: String,
    },
    amount: {
      type: Number,
    },
    amountPaid: {
      type: Number,
    },
    amountDue: {
      type: Number,
    },
    currency: {
      type: String,
    },
    receipt: {
      type: String,
    },
    status: {
      type: String,
    },
    userId: {
      type: String,
      ref: 'user',
    },
    sessionId: {
      type: String,
      ref: 'session',
    },
    attempts: {
      type: Number,
    },
    screenShot: {
      type: String,
    },
    utr: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const paymentModel = mongoose.model('payment', paymentScheme);

module.exports = paymentModel;
