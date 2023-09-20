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

const userLogout = (req, res) => {
  res.cookie("access_token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "Logged out successfully." });
};

const getAllUsers = async (req, res, next) => {
  const user = await User.find().exec();
  res.json(user);
};


const getUserIdFromToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token){
    return res.status(401).json({ message: "Token not found."});
  }
  try{
    const tokenData = jwt.verify(token, req.secretKey);
    const userId = tokenData._id;
    console.log(userId);
    console.log(tokenData);
    res.json(userId);

  }
  catch(error){
    return res.status(401).json({ message: ""})
  }
}

module.exports = {
  getAllUsers,
  createUser,
  userLogin,
  userLogout,
  getUserIdFromToken,
};
