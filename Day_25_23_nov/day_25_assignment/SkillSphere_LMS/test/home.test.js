// Import SuperTest to simulate HTTP requests against the Express application
const request = require("supertest");

// Import Chai for assertion methods (expect, assert)
const chai = require("chai");

// Extract the 'expect' function from Chai for cleaner assertions
const expect = chai.expect;

// Import the Express app instance from index.js
const app = require("../index");

// Test suite to verify the /home route functionality
describe("Integration Test: Home Route", () => {

    // Test case: Ensure that the /api/home route returns the correct welcome message
    it("GET /api/home should return welcome message", async () => {

        // Send a GET request to the /api/home endpoint using SuperTest
        const res = await request(app).get("/api/home");

        // Assert that the response status is 200 (OK)
        expect(res.status).to.equal(200);

        // Assert that the text response matches the expected welcome string
        expect(res.text).to.equal("Welcome to SkillSphere LMS API");
    });

});
