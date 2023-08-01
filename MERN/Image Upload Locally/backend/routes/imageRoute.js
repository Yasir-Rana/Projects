const express = require('express');
const router = express.Router();
const setData = require('../controllers/imageController');

router.route('/').post(setData);

module.exports = router;