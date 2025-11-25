const db = require("../config/mysql");

// Insert new course into MySQL
exports.addCourse = async (req, res) => {
    const { title, duration } = req.body;

    try {
        const sql = "INSERT INTO courses (title, duration) VALUES (?, ?)";
        await db.query(sql, [title, duration]);

        console.log("✅ Course Inserted into MySQL");
        res.json({ message: "Course Added Successfully" });

    } catch (error) {
        console.log("❌ MySQL Insert Error:", error);
        res.status(500).json({ error: "Failed to add course" });
    }
};
