// MySQL2 Database Connection

const mysql = require("mysql2");
require("dotenv").config();

// Create connection pool
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

// Check connection
pool.getConnection((err) => {
    if (err) console.error("❌ MySQL Connection Failed:", err);
    else console.log("✅ MySQL Connected");
});

module.exports = pool.promise();
