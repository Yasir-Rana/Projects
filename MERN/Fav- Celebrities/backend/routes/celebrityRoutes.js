const express = require("express");
const router = express.Router();
const { getData, getSingleData, setData, updateData, deleteData} = require("../controllers/celebrityController");

router.route('/').get(getData).post(setData);
router.route('/:id').get(getSingleData);
router.route('/:id').put(updateData).delete(deleteData);

module.exports = router;
