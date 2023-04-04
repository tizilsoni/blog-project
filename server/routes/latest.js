const express = require("express");
const router = express.Router();
const Post = require("./../models/Post.model");

router.get("/latest", async (req, res, next) => {
  //const limit = parseInt(req.query.limit) || 5;

  try {
    const posts = await Post.find()
      .populate("user", "username")
      .sort("-createdAt");
    //.limit(limit);
    res.json(posts);
  } catch (error) {
    res.status(500).end();
  }
});

module.exports = router;
