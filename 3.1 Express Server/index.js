import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<div class='red'><h1>hi Nino</h1></div>");
});

app.post("/regtister", (req, res) => {
  res.sendStatus(201);
});

app.put("/user/nino", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/nino", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/nino", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
