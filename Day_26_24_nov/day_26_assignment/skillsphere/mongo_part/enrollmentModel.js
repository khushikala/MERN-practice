const mongoose = require("../config/mongoose");

const enrollmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courseName: String
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
