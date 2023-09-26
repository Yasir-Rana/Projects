const express = require('express');

const router = express.Router();
const { uploadV2, uploadV3 } = require('./uploadController');
const storage = require('multer').memoryStorage();
const upload = require('multer')({ storage });

router.post("/upload", upload.single('file'), uploadV2);
router.post("/api/upload", upload.single('file'), uploadV3);

module.exports = router;
