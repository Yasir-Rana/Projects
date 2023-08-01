const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
  {
    imageURL: { type: String },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Image', imageSchema);