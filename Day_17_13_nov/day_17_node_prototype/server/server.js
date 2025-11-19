// create node js http server 


// import http module insitialize to http constant
const http = require("http");


// create http server 
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");

    // handle different requests
    if (req.url === "/") {
        res.statusCode = 200;
        return res.end("Welcome to Node.js Server");
    }

   else if (req.url === "/about") {
        res.statusCode = 200;
        return res.end("About Page: This is a minimal Node.js server prototype.");
    }

   else if (req.url === "/contact") {
        res.statusCode = 200;
        return res.end("Contact Page: Contact us at khushi@gmail.com");
    }

    // 404
    else {
        res.statusCode = 404;
        return res.end("404 Not Found.");
    }
});

server.listen(3000, () => {
    console.log("Server running at port ; 3000");
});




