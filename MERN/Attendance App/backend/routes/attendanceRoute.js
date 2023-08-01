const express = require('express');
const router = express.Router();
const { getData, getSingleData, setData, updateData, deleteData, getAllData, getAllDataWithinDateRange  } = require('../controllers/attendanceController');
const {protect} = require('../middlewares/authMiddleware')

router.route('/all').get(protect, getAllData);
router.route('/').get(protect, getData).post(protect, setData);
router.route('/:id').get(protect, getSingleData);
router.route('/:id').put(protect, updateData).delete(protect, deleteData);

// router.route('/:id').get(protect, getSingleData).delete(protect, deleteData);  // Anomaly
// router.route('/:id').get(protect, getSingleData).put(protect, updateData);    // Anomaly
module.exports = router;