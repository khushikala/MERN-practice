// Import SuperTest to simulate HTTP requests against the Express application
const request = require("supertest");

// Import Chai for assertion methods (expect)
const chai = require("chai");

// Extract the 'expect' assertion style from Chai
const expect = chai.expect;

// Import the Express application instance from index.js
const app = require("../index");

// Test suite to validate the behavior when a course is not found
describe("Integration Test: Course Not Found", () => {

    // Test case: When a non-existing course ID is requested, the API should return 404
    it("GET /api/courses/999 should return 404", async () => {

        // Make a GET request to a course ID that does not exist (999)
        const res = await request(app).get("/api/courses/999");

        // Assert that the response status code is 404 (Not Found)
        expect(res.status).to.equal(404);

        // Assert that the response body contains an 'error' field with the expected message
        expect(res.body).to.have.property("error", "Course not found");
    });

});
