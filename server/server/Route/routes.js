const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../Model/User");
const userRoute = Router();
////----USER----////

userRoute.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

userRoute.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await User.findById(id);
    res.json(posts);
  } catch (error) {
    res.status(403).json({ message: error });
  }
});

// Create
userRoute.post("/register", async (req, res) => {
  try {
    const existedUser = await User.findOne({ Email: req.body.Email });
    if (existedUser) {
      return res.json({ message: "User already Exist" });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);
    console.log(hashedPassword);
    const user = new User({
      FullName: req.body.FullName,
      UserName: req.body.UserName,
      Email: req.body.Email,
      Password: hashedPassword,
    });
    const addedUser = await user.save();
    // return res.json(addedUser);
    const userId = addedUser._id;
    return res.send(userId);
  } catch (error) {
    res.json({ message: error });
  }
});

// Create
userRoute.post("/login", async (req, res) => {
  const salt = 10;
  let email = {
    Email: req.body.Email,
  };
  try {
    const user = await User.findOne(email);
    if (!user) {
      return res.json({ message: "User does not exist" });
    }
    const verifiedPassword = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!verifiedPassword) {
      return res.json({ message: "Password is invalid" });
    }
    const userData = {
      id: user._id,
      author: user.FullName,
    };
    return res.send(userData);
  } catch (error) {
    res.json({ message: error });
  }
});

// get by Id
userRoute.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    fullname = user.FullName;
    return res.send(fullname);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = userRoute;
