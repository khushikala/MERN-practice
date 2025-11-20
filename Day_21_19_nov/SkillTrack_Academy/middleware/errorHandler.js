// User Story 5: Error Handling Middleware


//  Error Handling Middleware
// Must have 4 parameters → (err, req, res, next)

module.exports = function (err, req, res, next) {
    console.error("❌ Error caught by middleware:", err.stack);

    res.status(500).json({
        message: "Something went wrong on the server.",
        error: err.message
    });
};
