const asyncHandler = require("express-async-handler");
const Movie = require("../models/movieModel");

// @desc   Get MovieData
// @route  GET /api/movieData
// @access Public
const getData = asyncHandler(async (req, res) => {
  const movieData = await Movie.find({});
  res.status(200).json(movieData);
});

// @desc   Get Single MovieData
// @route  GET /api/movieData/:id
// @access Public
const getSingleData = asyncHandler(async (req, res) => {
  const movieData = await Movie.findById(req.params.id);
  res.status(200).json(movieData);
});

// @desc   Set MovieData
// @route  POST /api/movieData
// @access Public
const setData = asyncHandler(async (req, res) => {
  const { imageLink, title, description, movieLink } = req.body;
  const movie = new Movie({ imageLink, title, description, movieLink });
  const createdMovie = await movie.save();
  res.status(201).json(createdMovie);
});

// @desc   Update MovieData
// @route  PUT /api/movieData/:id
// @access Public
const updateData = asyncHandler(async (req, res) => {
  const { imageLink, title, description, movieLink } = req.body;
  const movieData = await Movie.findById(req.params.id);
  if (movieData) {
    movieData.imageLink = imageLink || movieData.imageLink;
    movieData.title = title || movieData.title;
    movieData.description = description || movieData.description;
    movieData.movieLink = movieLink || movieData.movieLink;

    const updatedMovieData = await Movie.findByIdAndUpdate(
      req.params.id,
      movieData,
      { new: true }
    );
    res.status(200).json(updatedMovieData);
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
});

// @desc   Delete MovieData
// @route  DELETE /api/movieData/:id
// @access Public
const deleteData = asyncHandler(async (req, res) => {
  const movieData = await Movie.findById(req.params.id);
  if (movieData) {
    const deletedMovieData = await Movie.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ message: "Data Deleted", deletedMovieData });
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
