const Balance = require("../models/balance");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const getBalance = async (req, res) => {
  console.log("in get balance");
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
      const userId = tokenData.userId;
      const userIdObjectId = mongoose.Types.ObjectId(userId);
      console.log(userId);
      console.log("initating balance lookup...");
      const balance = await Balance.findOne({ user_id: userIdObjectId }).exec();
      console.log(balance.balance);

      return res.json(balance);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getBalance,
};
