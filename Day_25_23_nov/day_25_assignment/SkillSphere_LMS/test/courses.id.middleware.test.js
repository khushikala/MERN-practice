// Import SuperTest – used to simulate HTTP requests on the Express app
const request = require("supertest");

// Import Chai for assertions (expect, assert, should)
const chai = require("chai");

// Extract the 'expect' assertion style from Chai
const expect = chai.expect;

// Import the Express app from index.js (needed to run it in test mode)
const app = require("../index");

// Test suite for validateCourseId middleware
describe("Integration Test: validateCourseId Middleware", () => {

    // Individual test case: invalid course ID should return status 400
    it("GET /api/courses/abc should return 400 (invalid id)", async () => {

        // Send a GET request to /api/courses/abc using SuperTest
        // 'abc' is NOT a valid number, so middleware should reject it
        const res = await request(app).get("/api/courses/abc");

        // Check that response status code is 400 (Bad Request)
        expect(res.status).to.equal(400);

        // Check that response body contains an 'error' field with this exact message
        expect(res.body).to.have.property("error", "Invalid Course ID");
    });

});
