const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc   Register User
// @route  POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check whether the User exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc   Authenticate User
// @route  POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.name, user.email, user.isAdmin),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc   Get Single User 
// @route  GET /api/user/getUser
// @access Private
const getSingleUser = asyncHandler(async (req, res) => {
  const { _id, name, email, isAdmin } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
    isAdmin
  });
});

// @desc   Get All Users 
// @route  GET /api/user/getUsers
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});


// Generate JWT
const generateToken = (id, name, email, isAdmin) => {
  return jwt.sign({ id, name, email, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getSingleUser,
  getAllUsers
};
