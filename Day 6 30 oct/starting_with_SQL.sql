-- We have to follow below steps for getting started with Database
-- Step 1: Install MySQL Server and MySQL Workbench
-- Step 2: Creating a Database or use an existing Database
-- Step 3: Creating a Table with required columns, column data types and constraints
-- Step 4: Inserting Data into the Table    
-- Step 5: Querying the Data from the Table  using SELECT statement
-- Step 6: Updating the Data in the Table using UPDATE statement
-- Step 7: Deleting the Data from the Table using DELETE statement
-- Step 8: Using WHERE clause to filter the data based on conditions
-- Step 9: Using ORDER BY clause to sort the data
-- Step 10: Using Aggregate functions like COUNT, SUM, AVG, MAX, MIN
-- Step 11: Using GROUP BY clause to group the data based on a column
-- Step 12: Using JOINs to combine data from multiple tables

-- following types of relational Databases are famous in industry
-- mySQL : Open Source Database widely used in Web Applications
-- PostgreSQL : Advanced Open Source Database with strong community support
-- Oracle : Enterprise level Database with advanced features and support
-- Microsoft SQL Server : Enterprise level Database used in large organizations MS Stack based applications
-- SQLite : Lightweight Database often used in mobile applications
-- MariaDB : Fork of MySQL with additional features and improvements
-- IBM DB2 : Enterprise level Database used in large organizations with IBM Stack based applications

--  Create the database if it doesn’t already exist
CREATE DATABASE IF NOT EXISTS EmployeeDB;

--  Switch to the created database
USE EmployeeDB;

--  Create the Employees table
CREATE TABLE IF NOT EXISTS Employees (
    EmployeeID INT PRIMARY KEY AUTO_INCREMENT,  -- Auto-increment primary key
    FirstName VARCHAR(50) NOT NULL,             -- First name cannot be null
    LastName VARCHAR(50) NOT NULL,              -- Last name cannot be null
    Email VARCHAR(100) UNIQUE NOT NULL,         -- Email must be unique and not null
    HireDate DATE NOT NULL,                     -- Stores date in YYYY-MM-DD format
    Salary DECIMAL(10, 2) NOT NULL              -- Salary with 2 decimal places
);

--  Insert sample data into the Employees table
INSERT INTO Employees (FirstName, LastName, Email, HireDate, Salary) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-01-15', 60000.00),
('Jane', 'Smith', 'jane.smith@example.com', '2023-02-20', 65000.00),
('Alice', 'Johnson', 'alice.johnson@example.com', '2023-03-10', 70000.00);

--  Query all employee data
SELECT * FROM Employees;

-- Query only specific columns (FirstName, LastName, Email)
SELECT FirstName, LastName, Email FROM Employees;