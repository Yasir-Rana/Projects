const express = require("express");
const router = express.Router();
const {setData, getData, deleteData, updateData, getSingleData} = require("../controllers/quizController")

router.route('/').get(getData).post(setData);
router.route('/:id').get(getSingleData);
router.route('/:id').put(updateData).delete(deleteData);
module.exports = router;