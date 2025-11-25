

// Central place to catch all server errors

module.exports = (err, req, res, next) => {
    console.error("ERROR:", err.message);

    res.status(500).json({
        error: "Internal Server Error",
        details: err.message
    });
};
