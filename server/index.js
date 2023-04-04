const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");
const cors = require("cors");
const regRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const updateRoutes = require("./routes/update");
const userBlogsRoutes = require("./routes/user-blogs");
const latestRoutes = require("./routes/latest");
const findRoutes = require("./routes/find");
const deleteRoutes = require("./routes/delete");
const createRoutes = require("./routes/create");
const checkUserRoutes = require("./routes/check-user");

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

app.use(regRoutes);

app.use(loginRoutes);

app.use(latestRoutes);

//getting post

app.use(findRoutes);

//deleting post

app.use(deleteRoutes);
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

app.use(checkUserRoutes);

app.use(userBlogsRoutes);

app.use(updateRoutes);

app.use(createRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
