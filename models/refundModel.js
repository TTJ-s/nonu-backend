const mongoose = require('mongoose');

const refundScheme = mongoose.Schema(
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
    currency: {
      type: String,
    },
    status: {
      type: String,
      default: 'pending',
    },
    userId: {
      type: String,
      ref: 'user',
    },
    sessionId: {
      type: String,
      ref: 'session',
    },
  },
  {
    timestamps: true,
  }
);

const refundModel = mongoose.model('refund', refundScheme);

module.exports = refundModel;
