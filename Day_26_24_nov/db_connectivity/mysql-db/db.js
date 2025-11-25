

// Step 1: Import mysql2
const mysql = require('mysql2');

// Step 1: Connect without DB
const initConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

// Step 2: Create database if not exists
initConnection.query("CREATE DATABASE IF NOT EXISTS schooldb", (err) => {
    if (err) {
        console.log("Error creating database:", err);
        return;
    }
    console.log("Database created: schooldb");
});

// Step 2: Create connection object
const db = mysql.createConnection({
    host: 'localhost',       // Database hoot
    user: 'root',           
    password: 'root',            
    database: 'schooldb'     
});

// Step 3: Connect to the database
db.connect((err) => {
    if (err) console.error('DB connection failed:', err);
    else console.log('Connected to MySQL database');

    // Step 3: Create table if not exists

const tableQuery = `
            CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100),
                course VARCHAR(100)
            )
        `;

        db.query(tableQuery, (err) => {
            if (err) console.log("Table creation error:", err);
            else console.log("Students table created");
        });
    });




// Step 4: Export the connection
module.exports = initConnection;
