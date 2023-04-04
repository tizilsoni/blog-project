const express = require("express");
const router = express.Router();
const User = require("./../models/User.model");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res, next) => {
  const username = req.body?.username?.trim();
  const email = req.body?.email?.trim();
  const password = req.body?.password?.trim();

  if (!username && !email && !password) {
    res.status(400).json({
      error: "Please enter all fields",
    });
    return;
  }

  const checkemail = await User.findOne({ email });
  if (checkemail) {
    res.status(400).json({
      error: "User email already exist",
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    token: Math.random().toString(36),
  });

  await user.save();

  res.status(201).end();

  return;
});

module.exports = router;
