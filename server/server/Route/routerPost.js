const { Router } = require("express");
const Post = require("../Model/Post");
const postRoute = Router();

////----ROUTE----////
postRoute.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

postRoute.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await Post.findById(id);
    // console.log(posts);
    return res.send(posts);
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

// Create
postRoute.post("/", async (req, res) => {
  const post = new Post({
    Title: req.body.Title,
    Content: req.body.Content,
    UserId: req.body.UserId,
    Author: req.body.Author,
  });
  try {
    const posts = await post.save();
    console.log(posts);
    
    return res.send(posts);
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

// Update
postRoute.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const post = {
    Title: req.body.Title,
    Content: req.body.Content,
    UserId: req.body.UserId,
    Author: req.body.Author,
  };
  try {
    await Post.findByIdAndUpdate(id, post);
    res.json({ message: "Post Update Seccess Fully" });
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

// Delete
postRoute.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Post.findByIdAndDelete(id);
    return res.json({ message: "Post Delete Seccess Fully" });
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

module.exports = postRoute;
