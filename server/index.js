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
const Post = require("./models/Post.model");

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

app.get("/latest", async (req, res, next) => {
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

app.get("/blog/:postId", async (req, res, next) => {
  const _id = req.params.postId;
  try {
    await Post.findById(_id)
      .populate("user", "username")
      .then((post) => {
        res.json(post);
      });
  } catch (error) {
    res.status(500).end;
  }
});

// app.use((req, res) => {
//   return res.status(404).end();
// });

// client -> req -> server
// server = req -> express (parse etc) -> middleware(authentication) -> /blog

app.use(async (req, res, next) => {
  const token = req.headers?.token;

  if (!token)
    return res.status(401).json({
      error: "Invalid Token",
    });

  try {
    const user = await User.findOne({ token });
    if (!user)
      return res.status(401).json({
        error: "Invalid Token",
      });

    req.currentUser = user;
  } catch (error) {
    return res.status(500).end();
  }

  next();
});

app.get("/check-user", async (req, res, next) => {
  return res.json(req.currentUser);
});

app.get("/blog", async (req, res, next) => {
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

app.post("/blog", async (req, res, next) => {
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

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
