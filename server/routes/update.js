const express = require("express");
const router = express.Router();
const Post = require("./../models/Post.model");

router.put("/update/:postId", async (req, res, next) => {
  const _id = req.params.postId;
  const title = req.body?.title?.trim();
  const description = req.body?.description?.trim();
  const topic = req.body?.topic?.trim();
  try {
    await Post.updateOne(
      { _id },
      {
        $set: {
          title,
          description,
          topic,
        },
      }
    );
    res.status(200).end();
  } catch (error) {
    res.status(404).end();
  }
});

module.exports = router;
