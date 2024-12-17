import express from "express";

const app = express();
const PORT = 3000;

const is_Weekday = (d = new Date()) => d.getDay() % 6 !== 0;
// const is_Weekend = (d = new Date()) => d.getDay() % 6 === 0;

app.get("/", (req, res) => {
  if (is_Weekday()) {
    res.render("index.ejs", { whichday: "weekday", dowhat: "work hard" });
  } else {
    res.render("index.ejs", { whichday: "weekend", dowhat: "have fun!" });
  }
  //
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
