const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
    },
    adminStatus: {
      type: Boolean,
    },
    adminPassword: {
      type: String,
    },
    adminType: {
      type: String,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;
