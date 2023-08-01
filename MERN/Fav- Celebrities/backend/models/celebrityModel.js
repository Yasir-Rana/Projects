const mongoose = require('mongoose');

const celebritySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Celebrity', celebritySchema);