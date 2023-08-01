const mongoose = require('mongoose');

const formSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    firstName: {
      type: String,
      required: [true, "Please enter your FirstName"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your LastName"],
    },
    email: {
      type: String,
      required: [true, "Please enter your Email"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your Phone Number"],
    },
    services: {
      type: [String],
      required: [true, "Please enter your Services"],
    },
    address: {
      type: String,
      required: [true, "Please enter your Address"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Form", formSchema);
