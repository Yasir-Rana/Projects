const asyncHandler = require("express-async-handler");
const Quiz = require("../models/quizModel");

// @desc   Get QuizData
// @route  GET /api/quiz
// @access Public
const getData = asyncHandler(async (req, res) => {
  const quizData = await Quiz.find({});
  res.status(200).json(quizData);
});

// @desc   Get Single QuizData
// @route  GET /api/quiz/:id
// @access Public
const getSingleData = asyncHandler(async (req, res) => {
  const quizData = await Quiz.findById(req.params.id);
  res.status(200).json(quizData);
});


// @desc   Set QuizData
// @route  POST /api/quiz
// @access Public
const setData = asyncHandler(async (req, res) => {
  const { question, options, correctOption } = req.body;
  const quiz = new Quiz({
    question,
    options,
    correctOption,
  });

  const createdQuiz = await quiz.save();
  res.status(201).json(createdQuiz);
});

// @desc   Update QuizData
// @route  PUT /api/quiz/:id
// @access Public
const updateData = asyncHandler(async (req, res) => {
  const { question, options,correctOption } = req.body;
  const quizData = await Quiz.findById(req.params.id);
  if (quizData) {
    quizData.question = question || quizData.question;
    quizData.options = options || quizData.options;
    quizData.correctOption = correctOption || quizData.correctOption;

    const updatedQuizData = await Quiz.findByIdAndUpdate(
      req.params.id,
      quizData,
      { new: true }
    );
    res.status(200).json(updatedQuizData);
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
});

// @desc   Delete QuizData
// @route  DELETE /api/quiz/:id
// @access Public
const deleteData = asyncHandler(async (req, res) => { 
  const quizData = await Quiz.findById(req.params.id);
  if (quizData) {
    const deletedQuizData = await Quiz.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ message: "Data Deleted", deletedQuizData });
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
  deleteData
};
