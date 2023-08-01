const asyncHandler = require("express-async-handler");
const upload = require('../middleware/multerMiddleware');

// @desc   Set Data
// @route  POST /image
// @access Public
const setData = asyncHandler(async (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: 'Image upload failed.' });
    } else {
      res.status(200).json({ message: 'Image upload successful.' });
      console.log(req.file);
    }
  });
});


module.exports = setData
