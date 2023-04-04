const express = require("express");
const router = express.Router();
const Post = require("./../models/Post.model");

router.delete("/del/:postId", async (req, res, next) => {
  const _id = req.params.postId;
  try {
    await Post.findByIdAndRemove(_id);
    res.end();
  } catch (error) {
    res.status(404).end();
  }
});

module.exports = router;
