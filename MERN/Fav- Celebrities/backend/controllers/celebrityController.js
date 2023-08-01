const asyncHandler = require("express-async-handler");
const Celebrity = require("../models/celebrityModel");

// @desc   Get CelebrityData
// @route  GET /api/celebrityData
// @access Public
const getData = asyncHandler(async (req, res) => {
  const celebrityData = await Celebrity.find({});
  res.status(200).json(celebrityData);
});

// @desc   Get Single CelebrityData
// @route  GET /api/celebrityData/:id
// @access Public
const getSingleData = asyncHandler(async (req, res) => {
  const celebrityData = await Celebrity.findById(req.params.id);
  res.status(200).json(celebrityData);
});

// @desc   Set CelebrityData
// @route  POST /api/celebrityData
// @access Public
const setData = asyncHandler(async (req, res) => {
  const { name, image, category } = req.body;
  const celebrity = new Celebrity({ name, image, category });
  const createdCelebrity = await celebrity.save();
  res.status(201).json(createdCelebrity);
});

// @desc   Update CelebrityData
// @route  PUT /api/celebrityData/:id
// @access Public
const updateData = asyncHandler(async (req, res) => {
  const { name, image, category } = req.body;
  const celebrityData = await Celebrity.findById(req.params.id);
  if (celebrityData) {
    celebrityData.name = name || celebrityData.name;
    celebrityData.image = image || celebrityData.image;
    celebrityData.category = category || celebrityData.category;

    const updatedCelebrityData = await Celebrity.findByIdAndUpdate(
      req.params.id,
      celebrityData,
      { new: true }
    );
    res.status(200).json(updatedCelebrityData);
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
});

// @desc   Delete CelebrityData
// @route  DELETE /api/celebrityData/:id
// @access Public
const deleteData = asyncHandler(async (req, res) => {
  const celebrityData = await Celebrity.findById(req.params.id);
  if (celebrityData) {
    const deletedCelebrityData = await Celebrity.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ message: "Data Deleted", deletedCelebrityData });
  } else {
    res.status(404);
    throw new Error("Data not Found");
  }
});

module.exports = {
  getData,
  getSingleData,
  setData,
  updateData,
  deleteData,
};
