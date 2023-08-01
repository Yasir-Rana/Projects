const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multerMiddleware');
const setData = require('../controllers/imageController');

router.route('/').post(upload.single('image'), setData);

module.exports = router;
