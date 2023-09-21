const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  const result = await user.save();
  res.json(result);
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
  if (cookies.access_token) {
    console.log("found access_token cookie");

    res.clearCookie("access_token", { httpOnly: true });
    console.log("Cleared access_token cookie");
  } else {
    console.log("cookie not found");
  }

  res.status(200).json({ msg: "Logged out successfully." });
  console.log(res.cookies);
  res.end();
};

const getAllUsers = async (req, res, next) => {
  const user = await User.find().exec();
  return res.json(user);
};

const getUserIdFromToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.access_token) {
    return res.status(401).json({ message: "Token not found." });
  }
  try {
    const tokenData = jwt.verify(token, req.secretKey);
    const userId = tokenData.userId;
    return res.json({ userId: userId });
  } catch (error) {
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
