const express = require("express");
const router = express.Router();
const {getPost, setPost, updatePost, deletePost, getSinglePostData} = require("../controllers/postsController")

router.route('/').get(getPost).post(setPost);
router.route('/:id').get(getSinglePostData);
router.route('/:id').put(updatePost).delete(deletePost);

module.exports = router