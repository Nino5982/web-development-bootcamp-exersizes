import express from "express";
import morgan from "morgan";

import { fileURLToPath } from "url";

const app = express();
const port = 3000;

app.use(morgan("tiny") 
);




app.get("/", (req, res) => {
  res.send("Hello from index2");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
