const express = require("express");
const router = express.Router();
const Post = require("./../models/Post.model");

router.get("/blog", async (req, res, next) => {
  const posts = await Post.find({
    user: req.currentUser._id,
  })
    .select({
      title: 1,
      topic: 1,
      description: 1,
    })
    .sort("-createdAt");
  return res.json(posts);
});

module.exports = router;
