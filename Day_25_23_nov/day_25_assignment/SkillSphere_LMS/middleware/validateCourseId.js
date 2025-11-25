
// Middleware to validate if course ID is a positive integer

module.exports = function validateCourseId(req, res, next) {
    const { id } = req.params;
    const numId = parseInt(id, 10);

    if (isNaN(numId) || numId != id || numId <= 0) {
       return res.status(400).json({ error: "Invalid Course ID" });
    }
    // Continue to next handler if valid
    next();
};
