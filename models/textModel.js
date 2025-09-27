const mongoose = require('mongoose');

const textSchema = mongoose.Schema(
  {
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const collegeModel = mongoose.model('text', textSchema);

module.exports = collegeModel;
