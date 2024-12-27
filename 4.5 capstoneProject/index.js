import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5500;
const blogsArray = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { blogsArray });
});

app.get("/create", (req, res) => {
  res.render("create.ejs", { blogsArray: blogsArray });
});

app.get("/articles/:id", (req, res) => {
  const postID = parseInt(req.params.id);
  res.render("articles.ejs", { blogsArray, postID });
});

app.post("/submit", (req, res) => {
  const { title, author, text } = req.body;
  let newPost = { title, author, text };
  blogsArray.push(newPost);
  res.redirect("/");
});

app.get("/articles/:id/edit", (req, res) => {
  const postID = parseInt(req.params.id);
  res.render("edit.ejs", { blogsArray, postID });
});

app.post("/articles/:id/edit", (req, res) => {
  const { title, author, text } = req.body;
  let editedPost = { title, author, text };
  const postID = parseInt(req.params.id, 10);
  blogsArray[postID] = editedPost;
  res.redirect("/");
});

app.delete("/articles/:id", (req, res) => {
  const postID = parseInt(req.params.id, 10);
  blogsArray = blogsArray.filter((_, index) => index !== postID);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
