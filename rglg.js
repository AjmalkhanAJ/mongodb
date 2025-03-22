const http = require("http");
const url = require("url");
const fs = require("fs");
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb+srv://ajmal:ajmal%40123@ajmal.i78ik.mongodb.net/");
let db;

client.connect()
  .then(() => {
    db = client.db("test");
    console.log("MongoDB connected!");
  })
  .catch(err => console.log("MongoDB connection failed:", err));

const server = http.createServer((req, res) => {
  const parseurl = url.parse(req.url, true);
  console.log(parseurl);

  if (parseurl.pathname === "/") {
    res.writeHead(500, { "content-type": "text/html" });
    fs.readFile("text.html", "utf8", (err, data) => {
      if (err) {
        res.writeHead(200,{ "content-type": "text/html" });
        res.write(`<h1> Error</h1>`);
        res.end();
        return;
      }
      res.write(data);
      res.end();
    });
  } 
  else if (parseurl.pathname === "/check") {
    const { name, mail, pass } = parseurl.query;
    db.collection("clg").insertOne({ name, mail, pass })
      .then(() => {
        res.writeHead(500, { "content-type": "text/html" });
        res.write(`<script>alert("Registration successful")</script>`);
        res.end();
      })
      .catch(err => {
        res.writeHead(500, { "content-type": "text/html" });
        res.write(`<h1> Error</h1>`);
        res.end();
        console.log(err);
      });
    }
    if (parseurl.pathname === "/log") {
        res.writeHead(200, { "content-type": "text/html" });
        fs.readFile("txt1.html", "utf8", (err, data) => {
          if (err) {
            res.writeHead(200, { "content-type": "text/html" });
            res.write(`<h1> Error</h1>`);
            res.end();
            return;
          }
          res.write(data);
          res.end();
        }); 
    }
  else if (parseurl.pathname === "/login") {
    const { name, mail, pass } = parseurl.query;
    db.collection("clg").findOne({ name, mail, pass })
      .then(data => {
        if (data) {
          res.writeHead(200, { "content-type": "text/html" });
          res.write(`<script>alert("Login successful")</script>`);
          console.log(data);
          res.end();
        } else {
          res.writeHead(401, { "content-type": "text/html" });
          res.write(`<script>alert("Invalid data")</script>`);
          res.end();
        }
      })
      .catch(err => {
        res.writeHead(500, { "content-type": "text/html" });
        res.write(`<h1> Error</h1>`);
        res.end();
        console.log(err);
      });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write(`<h1>Page Not Found</h1>`);
    res.end();
  }
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});