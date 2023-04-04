const express = require("express");
const router = express.Router();
const Post = require("./../models/Post.model");

router.get("/blog/:postId", async (req, res, next) => {
  const _id = req.params.postId;
  try {
    await Post.findById(_id)
      .populate("user", "username")
      .then((post) => {
        res.json(post);
      });
  } catch (error) {
    res.status(500).end();
  }
});

module.exports = router;
