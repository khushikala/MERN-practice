/* TechNova Employee Rewards & Performance Management System */

/* ===================================================== */
/* User Story 1 — Database Setup (DDL) */
/* ===================================================== */

/* 1. Create Database */
CREATE DATABASE IF NOT EXISTS TechNovaDB;
USE TechNovaDB;

/* 2. Create Tables */

/* Department Table */
CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(50) UNIQUE NOT NULL,
    Location VARCHAR(50)
);

/* Employee Table */
CREATE TABLE Employee (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(50) NOT NULL,
    Gender ENUM('M','F','O'),
    DOB DATE,
    HireDate DATE,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

/* Project Table */
CREATE TABLE Project (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100) UNIQUE NOT NULL,
    DeptID INT,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

/* Performance Table */
CREATE TABLE Performance (
    EmpID INT,
    ProjectID INT,
    Rating DECIMAL(3,2),
    ReviewDate DATE,
    PRIMARY KEY (EmpID, ProjectID),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

/* Reward Table */
CREATE TABLE Reward (
    EmpID INT,
    RewardMonth DATE,
    RewardAmount DECIMAL(10,2),
    PRIMARY KEY (EmpID, RewardMonth),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);

/* 3. Create Indexes for Optimization */
CREATE INDEX idx_empname ON Employee(EmpName);
CREATE INDEX idx_deptid ON Employee(DeptID);

/* ===================================================== */
/* User Story 2 — Insert and Manage Data (DML) */
/* ===================================================== */

/* 1. Insert Sample Records */
INSERT INTO Department VALUES
(101, 'IT', 'Bangalore'),
(102, 'HR', 'Delhi'),
(103, 'Finance', 'Mumbai'),
(104, 'Marketing', 'Hyderabad'),
(105, 'Operations', 'Chennai');

INSERT INTO Employee VALUES
(1, 'Asha', 'F', '1990-07-12', '2018-06-10', 101),
(2, 'Raj', 'M', '1988-04-09', '2020-03-22', 102),
(3, 'Neha', 'F', '1995-01-15', '2021-08-05', 101),
(4, 'Vikram', 'M', '1992-11-02', '2019-09-10', 103),
(5, 'Priya', 'F', '1996-05-27', '2022-02-15', 104);

INSERT INTO Project VALUES
(201, 'ERP Upgrade', 101, '2020-01-01', '2021-06-30'),
(202, 'Recruitment Drive', 102, '2021-03-01', '2021-12-31'),
(203, 'Budget Automation', 103, '2021-05-15', '2022-03-30'),
(204, 'Digital Marketing', 104, '2022-01-10', '2023-01-10'),
(205, 'Inventory Optimization', 105, '2021-07-01', '2022-06-30');

INSERT INTO Performance VALUES
(1, 201, 4.5, '2021-06-30'),
(2, 202, 3.9, '2021-12-20'),
(3, 201, 4.8, '2021-06-30'),
(4, 203, 4.2, '2022-03-25'),
(5, 204, 4.0, '2023-01-05');

INSERT INTO Reward VALUES
(1, '2023-01-01', 2500),
(2, '2023-02-01', 1800),
(3, '2023-03-01', 3200),
(4, '2023-04-01', 950),
(5, '2023-05-01', 2100);

/* 2. Update one employee's department */
UPDATE Employee
SET DeptID = 105
WHERE EmpID = 5;

/* 3. Delete one reward record where the amount is less than 1000 */
DELETE FROM Reward
WHERE RewardAmount < 1000;

/* ===================================================== */
/* User Story 3 — Generate Insights (DQL, Aggregate and Date Functions) */
/* ===================================================== */

/* 1. Retrieve all employees who joined after 2019-01-01 */
SELECT EmpName, HireDate
FROM Employee
WHERE HireDate > '2019-01-01';

/* 2. Average performance rating of employees in each department */
SELECT d.DeptName, AVG(p.Rating) AS Avg_Rating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
GROUP BY d.DeptName;

/* 3. List employees with their age */
SELECT EmpName,
       TIMESTAMPDIFF(YEAR, DOB, CURDATE()) AS Age
FROM Employee;

/* 4. Find total rewards given in the current year */
SELECT YEAR(RewardMonth) AS Year,
       SUM(RewardAmount) AS Total_Rewards
FROM Reward
WHERE YEAR(RewardMonth) = YEAR(CURDATE())
GROUP BY YEAR(RewardMonth);

/* 5. Retrieve employees who have received rewards greater than 2000 */
SELECT e.EmpName, r.RewardAmount
FROM Employee e
JOIN Reward r ON e.EmpID = r.EmpID
WHERE r.RewardAmount > 2000;

/* ===================================================== */
/* User Story 4 — Advanced Queries (Joins and Subqueries) */
/* ===================================================== */

/* 1. Display Employee Name, Department Name, Project Name, and Rating */
SELECT e.EmpName, d.DeptName, pr.ProjectName, p.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
JOIN Project pr ON p.ProjectID = pr.ProjectID;

/* 2. Find highest-rated employee in each department */
SELECT d.DeptName, e.EmpName, p.Rating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
WHERE p.Rating = (
    SELECT MAX(p2.Rating)
    FROM Performance p2
    JOIN Employee e2 ON p2.EmpID = e2.EmpID
    WHERE e2.DeptID = d.DeptID
);

/* 3. List employees who have not received any rewards */
SELECT EmpName
FROM Employee
WHERE EmpID NOT IN (SELECT EmpID FROM Reward);

/* ===================================================== */
/* User Story 5 — Transaction Control and Optimization */
/* ===================================================== */

/* Transaction Example */
START TRANSACTION;

-- Insert new employee
INSERT INTO Employee VALUES (6, 'Kiran', 'M', '1994-09-09', '2023-11-01', 101);

-- Insert performance record
INSERT INTO Performance VALUES (6, 201, 4.6, '2023-11-01');

-- If all inserts succeed, commit; otherwise rollback
COMMIT;

/* Example EXPLAIN (without additional index) */
EXPLAIN
SELECT e.EmpName, d.DeptName, pr.ProjectName, p.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
JOIN Project pr ON p.ProjectID = pr.ProjectID;

/* After Index Optimization */
CREATE INDEX idx_proj_deptid ON Project(DeptID);

EXPLAIN
SELECT e.EmpName, d.DeptName, pr.ProjectName, p.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance p ON e.EmpID = p.EmpID
JOIN Project pr ON p.ProjectID = pr.ProjectID;
