// how can we creare a express js  based on webserver for 

// create a ref
// defining app .get
// definign app.listen

const express = require('express');
const app = express();

app.get('/', (req, res) => {
        res.send('Hello, expresss!');
    });
    
    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    });