const mongoose = require("mongoose");
const User = require("./models/user");

mongoose
  .connect(
    "mongodb+srv://Budgethero:eatbutt@cluster0.55ykuqg.mongodb.net/Users?retryWrites=true&w=majority"
  ).then(() => {
    console.log("Connection established");
  }).catch(() => {
    console.log("Connection failed.");
  });

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