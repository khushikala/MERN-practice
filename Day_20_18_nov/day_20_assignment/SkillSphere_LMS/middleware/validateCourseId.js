
// Middleware to validate if course ID is numeric

module.exports = function validateCourseId(req, res, next) {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid course ID" });
    }
// Continue to next handler if valid
    next(); 
};
