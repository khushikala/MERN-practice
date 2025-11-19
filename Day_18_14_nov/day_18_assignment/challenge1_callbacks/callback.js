//  import fs from 'fs';
const fs = require('fs');

console.log("Reading file");


fs.readFile('data.txt','utf8',(err,data)=>{
    if(err){
        console.log("error in reading file",err);
        return;
    }
console.log("File content");
    console.log(data);


    // delay for 3 seconds
    setTimeout(()=>{
        console.log("File reading completed");
    },3000);
});
