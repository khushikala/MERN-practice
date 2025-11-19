console.log("Node.js Version:", process.version);
console.log("Current File:", __filename);
console.log("Current Directory:", __dirname);


console.log("Starting welcome messages...");

// print message every 3 seconds
const timer = setInterval(() => {
    console.log("Welcome to Node.js Fundamentals!");
},3000);

// stop after 10 seconnd

setTimeout(()=>{
    clearInterval(timer);
console.log("timer stopped after 10 seconds");

},10000
);
