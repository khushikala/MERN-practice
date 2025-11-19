const express = require('express');
const app = express();

// Custom Middleware to log method, URL, and timestamp

const loggerMiddleware =(req,res,next)=>{
// timestamp
    const time  =new Date().toLocaleString();
    console.log(`[${time}][${req.method}] ${req.url}`);
    /// move to next route
    next();
};

app.use(loggerMiddleware);

// route 1
app.get("/products",(req,res)=>{
    res.send("product route");
});

// route 2
app.get("/status",(req,res)=>{
    res.send("status route");
});

// start the server on port no. 4000
app.listen(4000,()=>{
    console.log("Visiting http://localhost:4000");
});