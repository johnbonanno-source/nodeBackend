const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const crypto = require("crypto");

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex"); // 32 bytes converted to a hex string
};
const secretKey = generateSecretKey();
const createUser = async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(user);
  const result = await user.save();
  console.log(typeof user._id);
  console.log("RESULT" + result);
  res.json(result);
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    // If user is not found or password doesn't match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Sign a token using the secret key
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  console.log("Hit our controller");
  const user = await User.find().exec();
  console.log(user);
  res.json(user);
};

module.exports = {
  getAllUsers,
  createUser,
  userLogin,
};
