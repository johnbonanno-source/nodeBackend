const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id }, req.secretKey, {
      expiresIn: "1h",
    });
    const hour = 1000 * 60 * 60;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + hour),
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

const userLogout = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.access_token) {
    return res.status(401).json({ message: "Token not found." });
  }
  try {
    res.clearCookie("access_token", { httpOnly: true });
    res.status(200).json({ msg: "Logged out successfully." });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Unable to fetch and clear session token" });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find().exec();
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

const getUserIdFromToken = async (req, res, next) => {
  try {
    let tokenData = null;
    // get the token
    const token = req.cookies.access_token;
    try {
      // decode the token
      tokenData = jwt.decode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    if (tokenData) {
      // get the user id
      const userId = tokenData.userId;
      return res.json({ userId: userId });
    } else {
      console.error("Token data is undefined or invalid.");
      res.status(401).json({ message: "Unable to fetch user id from token." });
    }
  } catch (error) {
    console.error("Error in getUserIdFromToken:", error);
    res.status(401).json({ message: "Unable to fetch user id from token." });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  userLogin,
  userLogout,
  getUserIdFromToken,
};
