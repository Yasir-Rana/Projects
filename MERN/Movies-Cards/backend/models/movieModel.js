const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema(
  {
    imageLink: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    movieLink: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Name', moviesSchema);