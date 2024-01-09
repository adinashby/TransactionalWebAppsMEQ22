const express = require("express");
const https = require("https");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const API_KEY = "797e4d8ebe0f188d30df398159ffb418";
const CITY_NAME = "Montreal";

// express app
const app = express();

const dbURI =
  "mongodb+srv://adinashby:1234@cluster0.bfy2hx3.mongodb.net/my-sample-blog-data?retryWrites=true&w=majority";

app.listen(3000);

// connect to mongodb & listen for requests
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// register view engine (default location is "views" folder
app.set("view engine", "ejs");

// If you like to change the default template location
// app.set("views", "myviews");

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  // console.log(blog);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
