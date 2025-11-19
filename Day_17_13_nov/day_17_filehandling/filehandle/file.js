// Example: Reading and Writing Files
//  Creating a ref 
const fs = require('fs');
//  Writing data to a file
fs.writeFile('example.txt', 'Hello Node.js File System!', (err) => {
  if (err) throw err;
  console.log('File written successfully.');
  //  Reading the file
  fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File content:', data);
  });
});


// read file  by promises 

// const fs = require('fs').promises;
//  async function readFileExample() {
//   try {
//     const data = await fs.readFile('example.txt', 'utf8');
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// }
// readFileExample();