const mongoose = require('mongoose');

const universitySchema = mongoose.Schema(
  {
    universityName: {
      type: String,
    },
    universitySynonyms: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const universityModel = mongoose.model('university', universitySchema);

module.exports = universityModel;
