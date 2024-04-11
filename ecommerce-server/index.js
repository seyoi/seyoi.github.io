const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/app.html");
});

app.get("/api/home", (req, res) => {
  res.json("hi");
});

// app.get("/animals/:name", (req, res) => {
//   const { name } = req.params;
//   if (name === "dog") {
//     res.json({ sound: "bark" });
//   } else if (name === "cat") {
//     res.json({ sound: "meow" });
//   } else {
//     res.status(404).json({ error: "Animal not found" });
//   }
// });
