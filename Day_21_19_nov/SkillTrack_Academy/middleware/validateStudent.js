// User Story 2: Validation Middleware


//  Validate student form submission

module.exports = function (req, res, next) {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Invalid input. Name and Email are required."
        });
    }

    next(); // Valid → continue to route handler
};
