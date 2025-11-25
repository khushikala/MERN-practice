const express = require("express");
const router = express.Router();
const controller = require("./mongoController");

router.get("/enrollments", controller.getEnrollments);

module.exports = router;
