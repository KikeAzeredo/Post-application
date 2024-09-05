import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];


app.get("/", (req, res) => {
    res.render("index.ejs", {
      posts: posts  
    })
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/view/:id", (req, res) => {
    let postId = req.params.id;
    res.render("view.ejs", {
        title: posts[postId].title,
        post: posts[postId].post,
        id: postId
    });
});

app.get("/edit/:id", (req, res) => {
    let postId = req.params.id;
    res.render("edit.ejs", {
        title: posts[postId].title,
        post: posts[postId].post,
        id: postId
    });
});

app.post("/create", (req, res) => {
    let newPost = {
        title: req.body.title,
        post: req.body.post
    }
    posts.push(newPost);
    res.redirect(`/view/${posts.length-1}`);
});

app.post("/edit/:id", (req, res) => {
    let postId = req.params.id;
    posts[postId].title = req.body.title;
    posts[postId].post = req.body.post;
    res.redirect(`/view/${postId}`);
});

app.get("/delete/:id", (req, res) => {
    let postId = req.params.id;
    posts.splice(postId, 1);
    res.render("index.ejs", {
        posts: posts  
      })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
