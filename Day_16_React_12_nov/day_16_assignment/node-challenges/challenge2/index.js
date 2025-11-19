

import figlet from "figlet";
import chalk from "chalk";

figlet("Welcome to Node.js", (err, data) => {
  if (err) {
    console.log("Something went wrong...");
    return;
  }
  console.log(chalk.green(data));
});