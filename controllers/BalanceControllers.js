const Balance = require('../models/balance');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const getBalance = async (req, res) => {
  try {
    let tokenData = null;
    const token = req.cookies.access_token;
    try {
      tokenData = jwt.decode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    if (tokenData) {
      const userId = tokenData.userId;
      const userIdObjectId = mongoose.Types.ObjectId(userId);
      const balance = await Balance.findOne({ user_id: userIdObjectId }).exec();
      return res.json(balance);
    }
  } catch (error) {
    console.error(error);
  }
};

const setBalance = async (req, res) => {
  const { balance } = req.body;
  try {
    let tokenData = null;
    const token = req.cookies.access_token;
    try {
      tokenData = jwt.decode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    if (tokenData) {
      const userId = tokenData.userId;
      const userIdObjectId = mongoose.Types.ObjectId(userId);
      console.log(userId);
      console.log('initating balance lookup...');
      await Balance.updateOne({ user_id: userIdObjectId }, { balance }).exec();
      return res.json({ balance });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getBalance,
  setBalance,
};
