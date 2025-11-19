
// import express 
 const express = require('express');

const app = express();
// this route reads query parameters using req.query
app.get("/product",(req,res)=>{
 // Extracting the 'name' query parameter from the URL
    const {name}= req.query;

// check if name is  provided;
    if(name){
        res.json({query:name});

    }
    // if name is not provided return error
    else{
        res.json({ error:"please provide a product anme"});
    }
});
//  starting the  server on port no. 4000
app.listen(4000,()=>{
    console.log("Visiting http://localhost:4000");
});


