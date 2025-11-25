const Enrollment = require("./enrollmentModel");

exports.getEnrollments = async (req, res) => {
    try {
        const data = await Enrollment.find().populate("user");
        if (data.length === 0) {
            res.json({
                message: "No enrollment data found. MongoDB collections exist but are empty.",
                hint: "Use seed_mongo.js to populate sample data or add documents via MongoDB Compass"
            });
        } else {
            res.json(data);
        }
    } catch (err) {
        console.error(" Error in getEnrollments:", err);
        res.status(500).json({
            error: "Failed to fetch enrollment data",
            details: err.message,
            hint: "Ensure MongoDB server is running on localhost:27017"
        });
    }
};
