const User = require("./models/user");
const { mongoose } = require("./db"); // Adjust the path as needed


  const createUser = async (req, res, next) => {
    const user = new User({
      username: "username",
      password: "password"
    });

    console.log(user);
    const result = await user.save();
    console.log(typeof user._id);
    console.log("RESULT"+result);
    res.json(result);  
  };

const getUserByUsername = async (req, res, next) => {
    console.log("Hit our controller");
    const user = await User.find().exec();
    const user1 = await User.find({User}).select(['username','password']);
    console.log(user);
    res.json(user)
};

exports.getUserByUsername = getUserByUsername;
exports.createUser = createUser;