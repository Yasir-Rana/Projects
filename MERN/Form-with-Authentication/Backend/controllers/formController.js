const asyncHandler = require("express-async-handler");
const Form = require("../models/formModel");

// @desc   Get FormData
// @route  GET /api/form
// @access Private
const getData = asyncHandler(async (req, res) => {
  const formData = await Form.find({ user: req.user.id });
  res.status(200).json(formData);
});

// @desc   Get Single FormData
// @route  GET /api/form/:id
// @access Private
const getSingleData = asyncHandler(async (req, res) => {
  const formData = await Form.findById(req.params.id);
  res.status(200).json(formData);
})

// @desc   Set FormData
// @route  POST /api/form
// @access Private
const setData = asyncHandler(async (req, res) => {
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.phone ||
      !req.body.services ||
      !req.body.address
    ) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const newSchema = new Form();
    newSchema.firstName = req.body.firstName;
    newSchema.lastName = req.body.lastName;
    newSchema.email = req.body.email;
    newSchema.phone = req.body.phone;
    newSchema.services = req.body.services;
    newSchema.address = req.body.address;
    newSchema.user = req.user._id;

    const savedSchema = await newSchema.save();
    res.status(200).json(savedSchema);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc   Update FormData
// @route  PUT /api/form/:id
// @access Private
const updateData = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, services, address } = req.body;
  const formData = await Form.findById(req.params.id);

  if (formData) {
    // Check if the logged-in user matches the form user
    if (formData.user.toString() === req.user._id.toString()) {
      formData.firstName = firstName || formData.firstName;
      formData.lastName = lastName || formData.lastName;
      formData.email = email || formData.email;
      formData.phone = phone || formData.phone;
      formData.services = services || formData.services;
      formData.address = address || formData.address;

      const updatedFormData = await Form.findByIdAndUpdate(
        req.params.id, formData, {
          new: true,
        }
      );

      res.status(200).json(updatedFormData);
    } else {
      res.status(401);
      throw new Error("Not authorized to update this form data");
    }
  } else {
    res.status(404);
    throw new Error("Form data not found");
  }
});

// @desc   Delete FormData
// @route  DELETE /api/form/:id
// @access Private
const deleteData = asyncHandler(async (req, res) => {
  const formData = await Form.findById(req.params.id);

  if (formData) {
    // Check if the logged-in user matches the form user
    if (formData.user.toString() === req.user._id.toString()) {
      const deletedFormData = await Form.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id,
      });

      res.status(200).json({ message: "Form data deleted successfully", deletedFormData });
    } else {
      res.status(401);
      throw new Error("Not authorized to delete this form data");
    }
  } else {
    res.status(404);
    throw new Error("Form data not found");
  }
});

module.exports = {
  getData,
  getSingleData,
  setData,
  updateData,
  deleteData,
};
