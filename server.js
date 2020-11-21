const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist/linkedsave-ng"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/linkedsave-ng/index.html");
});

app.listen(PORT, () => {
  console.log("Server started port " + PORT);
});
