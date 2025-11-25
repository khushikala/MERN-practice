


// Validation middleware for Create & Update requests

const { body, validationResult } = require("express-validator");

// Validation rules
exports.validateCourse = [
    body("name").notEmpty().withMessage("Course name is required"),
    body("duration").notEmpty().withMessage("Course duration is required"),

    // Handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }
        next();
    }
];
