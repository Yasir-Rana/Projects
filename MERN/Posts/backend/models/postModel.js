const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    creator: {
      type: String,
      required: [true, "Please add a Text Value"],
    },
    title: {
      type: String,
      required: [true, "Please add a Text Value"],
    },
    message: {
      type: String,
      required: [true, "Please add a Text Value"],
    },
    tags: {
      type: [String],
      required: [true, "Please add a Text Value"],
    },
    image: {
      type: String,
      required: [true, "Please add a Text Value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
