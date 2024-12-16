import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let bandname = "";

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

function bandNameGenerator(req, res, next) {
  bandname = req.body.street + req.body.name;
  next();
}
app.use(bandNameGenerator);

app.post("/submit", (req, res) => {
  res.send(bandname);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
