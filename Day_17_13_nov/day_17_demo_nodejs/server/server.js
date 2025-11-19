// create a simple http based  backend server  using node js
//Step 1: Creating http constant
//Step 2: creating Http server 
//Step 3: starting the server @3000 port
//Step 4: running the server

const http = require("http");
const server = http.createServer((req, res) => {
    res.end("welcome to node");
});
server.listen(3000, () => {
    console.log("server is running on port no. 3000");
});



