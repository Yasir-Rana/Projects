const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attendanceCount: { type: Number, default: 0 },
    leaveCount: { type: Number, default: 0 },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Attendance', attendanceSchema);



