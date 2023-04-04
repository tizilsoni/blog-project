const express = require("express");
const router = express.Router();
const Post = require("./../models/Post.model");

router.post("/blog", async (req, res, next) => {
  console.log(req.body);
  const title = req.body?.title?.trim();
  const description = req.body?.description?.trim();
  const topic = req.body?.topic?.trim();

  const post = new Post({
    title,
    description,
    topic,
    user: req.currentUser._id,
  });

  await post.save();
  res.status(201).end();

  return;
});

module.exports = router;
