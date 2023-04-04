const express = require("express");
const router = express.Router();
const User = require("./../models/User.model");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const email = req.body?.email?.trim();
    const password = req.body?.password?.trim();
    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !",
        });

      if (isMatch)
        return res.status(200).json({
          message: "User Found",
          token: user.token,
          username: user.username,
          email: user.email,
        });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;
