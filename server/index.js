const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const User = require("./models/User.model");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Error Connecting", err));

app.get("/", (req, res) => {
  res.send("Connection Established");
});

app.post("/register", async (req, res, next) => {
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

app.post(
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
        });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
