// here we will implemnt Login API that returns JWT token upon successful login
// Step 1: basics express Server setup 
// Step 2: Create a dummy user ( Hardcoded Username and password )
// Step 3: Create a login route that accepts username and password
// Step 4: Validate the credentials
// Step 5: If valid, generate JWT token and return it in response
// Step 6: If invalid, return an error message


//Importing express so we can create a server.
const express = require("express");
//Importing jsonwebtoken library to generate JWT tokens.
const jwt = require("jsonwebtoken");

//Importing body-parser so your server can read JSON from request body.
const bodyParser = require("body-parser");
//Creating an Express app.
const app = express();
// Telling Express to accept JSON data automatically.
app.use(express.json());

const PORT = 3000;
// below secret key will be used to sign the JWT token ie to create tokenised version of user data ex 
//password is Login@123 then after implemting JWT it will be some random string of characters like 
// 'sdf8s7df8s7df8s7df8s7df8s7df8s7df8s7df8s7'
//Secret key to sign (create) JWT tokens.
const SECRET_Key = 'My_secret_key2123'; 
// In real applications, we use environment variables to store secret keys
app.use(bodyParser.json());
// Step 2: Create a dummy user
const dummyUser = {
    username: 'testuser',
    password: 'Login@123'
};
// Step 3: Create a login route
//Login details will come in req.body.
app.post('/login', (req, res) => {
    //Extract username and password from the request body.
    const { username, password } = req.body;    
    // Step 4: Validate the credentials
    if (username === dummyUser.username && password === dummyUser.password) {
        // Step 5: If valid, generate JWT token and return it in response using jwt.sign() method
        //Create a JWT token with:
        const token = jwt.sign({ username: dummyUser.username }, SECRET_Key, { expiresIn: '1h' });
        // Send the generated token back to the client.
        res.json({ token });
    } else {
        // Step 6: If invalid, return an error message
        res.status(401).json({ error: 'Invalid credentials' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Example curl command:
// curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"testuser", "password":"Login