const mongoose = require('mongoose');

const collegeSchema = mongoose.Schema(
  {
    collegeName: {
      type: String,
      set: (value) => value.toLowerCase(),
    },
    universityName: {
      type: String,
      ref: 'university',
    },
    district: {
      type: String,
      set: (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    },
    state: {
      type: String,
      set: (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    },
  },
  {
    timestamps: true,
  }
);

const collegeModel = mongoose.model('college', collegeSchema);

module.exports = collegeModel;
