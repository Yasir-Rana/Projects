const asyncHandler = require("express-async-handler");
const { uploadToFirebaseStorage } = require("../middleware/multerMiddleware");
const Image = require("../models/imageModel");

// @desc   Set Data
// @route  POST /image
// @access Public
const setData = asyncHandler(async (req, res) => {
  const imageUrl = req.file ? await uploadToFirebaseStorage(req.file) : null;
  if (!imageUrl) { return res.status(400).json({ error: "Image upload failed." }) }
  const image = await Image.create({ imageURL: imageUrl });
  res.status(200).json({ message: "Image Uploaded Successfully", image });
});

module.exports = setData;
