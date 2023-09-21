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
    // get id of current user
    const userId = req.query.userId;
    // // filter expenses by userId
    const query = { userId: new ObjectId(userId) };
    // // match expenses
    const expenses = await Expense.find(query).exec();

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
};
