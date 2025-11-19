import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/") {
      const content = await fs.readFile("index.html", "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    } else if (req.url === "/about") {
      const content = await fs.readFile("about.html", "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Page Not Found</h1>");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h1>Internal Server Error</h1>");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
