const mongoose = require("mongoose")

const todoSchema = mongoose.Schema(
{
    todo: {
        type: String,
        required: [true, "Please add a Text Value"],
    },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);