const asyncHandler = require("express-async-handler");
const Attendance = require("../models/attendanceModel");


// @desc   Get All Data
// @route  GET /api/attendance/all
// @access Public
const getAllData = asyncHandler(async (req, res) => {
  const attendanceData = await Attendance.find({}).populate("user");
  if (attendanceData) {
    res.status(200).json(attendanceData);
  } else {
    res.status(404);
    throw new Error("Attendance data not found");
  }
});


// @desc   Get Data
// @route  GET /api/attendance
// @access Private
const getData = asyncHandler(async (req, res) => {
  const attendanceData = await Attendance.findOne({user: req.user.id}).populate("user");
  if (attendanceData) {
    res.status(200).json(attendanceData);
  } else {
    res.status(404);
    throw new Error("Attendance data not found");
  }
});


// @desc   Get Single Data
// @route  GET /api/attendance/:id
// @access Private
const getSingleData = asyncHandler(async (req, res) => {
  const attendanceData = await Attendance.findById(req.params.id).populate("user");

  if (attendanceData) {
    res.status(200).json(attendanceData);
  } else {
    res.status(404);
    throw new Error("Attendance data not found");
  }
});

// @desc   Set Data
// @route  POST /api/attendance
// @access Private
const setData = asyncHandler(async (req, res) => {
  const { attendanceCount, leaveCount } = req.body;

  let attendanceData = await Attendance.findOne({ user: req.user.id });

  if (attendanceData) {
    attendanceData.attendanceCount += attendanceCount;
    attendanceData.leaveCount += leaveCount;

    attendanceData = await attendanceData.save();
  } else {
    attendanceData = await Attendance.create({
      user: req.user.id,
      attendanceCount,
      leaveCount,
    });
  }
  res.status(200).json(attendanceData);
});

// @desc   Update Data
// @route  PUT /api/attendance/:id
// @access Private
const updateData = asyncHandler(async (req, res) => {
  const { name, email, attendanceCount, leaveCount } = req.body;
  const attendanceData = await Attendance.findById(req.params.id).populate("user");
  if (attendanceData) {
    attendanceData.name = name || attendanceData.name;
    attendanceData.email = email || attendanceData.email;
    attendanceData.attendanceCount = attendanceCount || attendanceData.attendanceCount;
    attendanceData.leaveCount = leaveCount || attendanceData.leaveCount;

    const updatedAttendanceData = await Attendance.findByIdAndUpdate(
      req.params.id,
      attendanceData,
      { new: true }
    );
    res.status(200).json(updatedAttendanceData);
  } else {
    res.status(404);
    throw new Error("Data not found");
  }
});

// @desc   Delete Data
// @route  DELETE /api/attendance/:id
// @access Private
const deleteData = asyncHandler(async (req, res) => {
  const attendanceData = await Attendance.findById(req.params.id);
  if (attendanceData) {
    const deletedData = await Attendance.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({ message: "Data Deleted", deletedData });
  } else {
    res.status(404);
    throw new Error("Data not Found");
  }
});

module.exports = {
  getAllData,
  getData,
  getSingleData,
  setData,
  updateData,
  deleteData,
};
