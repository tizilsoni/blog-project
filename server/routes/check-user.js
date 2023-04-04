const express = require("express");
const router = express.Router();

router.get("/check-user", async (req, res, next) => {
  return res.json(req.currentUser);
});

module.exports = router;
