const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    uuid: {
      type: String, // ? uuid from firebase
    },
    fullName: {
      type: String,
    },
    age: {
      type: Number,
    },
    phone: {
      type: String,
      trim: true,
    },
    idCard: {
      type: String,
    },
    institutionName: {
      type: String,
      set: (value) => value.toLowerCase(),
    },
    universityName: {
      type: String,
      ref: 'university',
    },
    institutionEmail: {
      type: String,
    },
    institutionStart: {
      type: String,
    },
    institutionEnd: {
      type: String,
    },
    department: {
      type: String,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'rejected', 'accepted', 'deleted'],
    },
    userDeviceToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
