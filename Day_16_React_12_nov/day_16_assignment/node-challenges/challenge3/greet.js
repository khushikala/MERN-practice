const moment = require("moment");

const name = process.argv[2];

if (!name) {
  console.log("please provide  a namelike this node greet.js khushi");
  process.exit();
}

const formatted = moment().format("ddd MMM D YYYY, hh:mm A");

console.log(`Hello, ${name}! Today is ${formatted}`);
