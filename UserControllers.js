const jwt = require('jsonwebtoken');
const User = require('./models/user');

const createUser = async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(user);
  const result = await user.save();
  console.log(typeof user._id);
  console.log('RESULT' + result);
  res.json(result);
};

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, req.secretKey, {
      expiresIn: '1h',
    });
    return res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

const userLogout=(req,res) =>{
  console.log("LogoutC");
  res.cookie('access_token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({msg: 'Logged out successfully.'});
}

const getAllUsers = async (req, res, next) => {
  console.log('Hit our controller');
  const user = await User.find().exec();
  console.log(user);
  res.json(user);
};

module.exports = {
  getAllUsers,
  createUser,
  userLogin,
  userLogout
};
