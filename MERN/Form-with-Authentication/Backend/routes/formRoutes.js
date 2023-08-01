const express = require("express");
const router = express.Router();
const {setData, getData, updateData, deleteData, getSingleData} = require("../controllers/formController")
const {protect} = require('../middlewares/authMiddleware')

router.route('/').get(protect, getData).post(protect, setData);
router.route('/:id').get(protect, getSingleData)
router.route('/:id').put(protect, updateData).delete(protect, deleteData)

module.exports = router;