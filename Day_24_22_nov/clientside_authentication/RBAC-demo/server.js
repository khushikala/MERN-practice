// Step 1: Set up the Express server
//Step 2: Define user roles and permissions
//Step 3: Create middleware to check permissions
//Step 4: Define routes with role-based access control


const express = require('express'); 
const app = express();
const PORT = 3000;
// Step 2: Define user roles and permissions 
const users = {
    alice: { role: 'admin' },
    bob: { role: 'editor' },
    charlie: { role: 'viewer' }
};
// Define permissions for each role
const rolesPermissions = {
    admin: ['read', 'write', 'delete'],
    editor: ['read', 'write'],
    viewer: ['read']
};

// Step 3: Create middleware to check permissions
//This function takes an action (read/write/delete)
function checkPermission(action) {
    //It returns another function (actual middleware)
    return (req, res, next) => {    
        //Username will come from header
        const username = req.headers['username'];
        // Check if user exists
        if (!username || !users[username]) {
            return res.status(401).send('Unauthorized: User not found'); //Standardized unauthorized response
        }
        // Check if user has permission
        //Get the user’s role (admin/editor/viewer)
        const userRole = users[username].role;
        // Check if user has permission
        //Get allowed actions for that role
        const permissions = rolesPermissions[userRole] || [];
        //check if use has not permission
        if (!permissions.includes(action)) {
            return res.status(403).send('Forbidden: You do not have permission to perform this action');
        }// User has permission
        //Permission OK → continue to the route
        next();
    };      
}

// Step 4: Define routes with role-based access control
//Only users who have read permission can access /read
app.get('/read', checkPermission('read'), (req, res) => {
    res.send('This is a read operation');
});
app.post('/write', checkPermission('write'), (req, res) => {
    res.send('This is a write operation');
});
app.delete('/delete', checkPermission('delete'), (req, res) => {
    res.send('This is a delete operation');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// testing above code use curl or postman to test different users and their permissions
// Example curl commands on powershell ]:
// curl -H "username : alice" http://localhost:3000/read
// curl.exe -H "username: alice" http://localhost:3000/read
// curl -Method GET -Uri "http://localhost:3000/read" -Headers @{username="alice"}
// curl -H "username : bob" -X POST http://localhost:3000/write
// curl -H "username : charlie" -X DELETE http://localhost:3000/delete
