// import fs from 'fs' with promises
const fs = require('fs').promises;

// artificial delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function copyFile(){
try {
    // read file
const data = await fs.readFile("input.txt","utf8");

console.log(" data read succcessfully");

await delay(3000);

// write file
await fs.writeFile("output.txt",data,"utf8");

console.log("file copied successfully");
} catch (error) {
console.log("error in reading file",error);
}

}


copyFile();