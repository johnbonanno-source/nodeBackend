const Expense = require('../models/expense');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createExpense = async (req, res) => {
  try {
    const { title, cost, date, isReoccuring } = req.body;
    const userId = req.userId;
    const newExpense = new Expense({
      title,
      cost,
      date,
      isReoccuring,
      userId,
    });
    await newExpense.save();
    const expenses = await Expense.find().exec();

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    console.log('get expense');
    const userId = req.userId;
    const userIdObjectId = mongoose.Types.ObjectId(userId);
    const query = { userId: userIdObjectId };
    console.log(query)
    const expenses = await Expense.find(query).exec();
    console.log(expenses);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};


module.exports = {
  createExpense,
  getAllExpenses,
};
