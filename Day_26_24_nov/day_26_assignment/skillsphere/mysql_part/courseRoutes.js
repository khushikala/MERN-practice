const express = require("express");
const router = express.Router();
const controller = require("./courseController");

// POST /mysql/add
router.post("/add", controller.addCourse);

module.exports = router;
