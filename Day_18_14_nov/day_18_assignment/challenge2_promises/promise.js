// import fs from  "fs" with promises
const fs = require('fs').promises;


fs.readFile("input.txt","utf8")
.then(data=>{
    return fs.writeFile("output.txt",data);
})
.then (()=>{
    console.log("file copied successfully");
})
.catch((err)=>{
    console.log(err);
    
});