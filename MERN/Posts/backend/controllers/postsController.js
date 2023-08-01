const asyncHandler = require("express-async-handler")
const Post = require("../models/postModel")

// @desc   Get PostData
// @route  GET /api/post
// @access Public
const getPost = asyncHandler(async(req, res) => {
    const postData = await Post.find({});
    res.status(200).json(postData);
})

// @desc   Get Single PostData
// @route  GET /api/post/:id
// @access Public
const getSinglePostData = asyncHandler(async (req, res) => {
    const postData = await Post.findById(req.params.id);
    res.status(200).json(postData);
  })

// @desc   Set Post
// @route  POST /api/post
// @access Public
const setPost = asyncHandler(async(req, res) => {
    try {
        if (
          !req.body.creator ||
          !req.body.title ||
          !req.body.message ||
          !req.body.tags ||
          !req.body.image
        ) {
          res.status(400);
          throw new Error("All fields are required");
        }
    
        const newSchema = new Post();
        newSchema.creator = req.body.creator;
        newSchema.title = req.body.title;
        newSchema.message = req.body.message;
        newSchema.tags = req.body.tags;
        newSchema.image = req.body.image;
    
        const savedSchema = await newSchema.save();
        res.status(200).json(savedSchema);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

// @desc   Update Post
// @route  PUT /api/post/:id
// @access Public
const updatePost = asyncHandler(async(req, res) => {
  const { creator, title, message, tags, image } = req.body;
  const postData = await Post.findById(req.params.id);
  if(postData){
    postData.creator = creator || postData.creator;
    postData.title = title || postData.title;
    postData.message = message || postData.message;
    postData.tags = tags || postData.tags;
    postData.image = image || postData.image;

    const updatedPostData = await Post.findByIdAndUpdate(
        req.params.id, postData, {
          new: true,
        }
      );
      res.status(200).json(updatedPostData);
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
})

// @desc   Delete Post
// @route  DELETE /api/post/:id
// @access Public
const deletePost = asyncHandler(async(req, res) => {
    const postData = await Post.findById(req.params.id);
    if(postData){
        const deletedPostData = await Post.findOneAndDelete({
            _id: req.params.id,
          });
        res.status(200).json({ message: "Data deleted successfully", deletedPostData });
    }else {
        res.status(404);
        throw new Error("Data not found");
      }
})

module.exports = {
    getPost,
    getSinglePostData,
    setPost,
    updatePost,
    deletePost,
}