const express = require('express');
const app = express();


app.get("/",(req,res)=>{

    res.send("Welcome to Express Server ");
})

app.get("/status",(req,res)=>{
    res.json(
        { "server": "running", "uptime": "OK" }
    )
})


app.listen(4000,()=>{
    console.log("Visiting http://localhost:4000");
})