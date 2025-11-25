// Import SuperTest to simulate HTTP requests against the Express application
const request = require("supertest");

// Import Chai for assertion utilities
const chai = require("chai");

// Extract the 'expect' assertion style from Chai
const expect = chai.expect;

// Import the Express app from index.js
const app = require("../index");

// Test suite for integration testing of the /api/users API
describe("Integration Test: /api/users API", () => {

    // Test case 1: Ensure that a POST request with valid data returns a success message
    it("POST /api/users should return success response", async () => {

        // Send a POST request to /api/users with sample user data
        const res = await request(app)
            .post("/api/users")
            .send({
                name: "Khushi",
                email: "khushi@example.com"
            });

        // Assert that the response status code is 200 (OK)
        expect(res.status).to.equal(200);

        // Assert the API returns the correct success message
        expect(res.body).to.have.property("message", "User created successfully");

        // Assert the response includes the submitted name inside 'data'
        expect(res.body.data).to.have.property("name", "Khushi");
    });

    // Test case 2: Ensure the API accepts and returns any JSON body (flexible parsing)
    it("POST /api/users should accept any JSON body", async () => {

        // Send a POST request with different JSON fields
        const res = await request(app)
            .post("/api/users")
            .send({
                city: "Ujjain",
                role: "Student"
            });

        // Assert that the response status is 200 (OK)
        expect(res.status).to.equal(200);

        // Assert that the 'role' field is correctly returned
        expect(res.body.data.role).to.equal("Student");
    });

});
