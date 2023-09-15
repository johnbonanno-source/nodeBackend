const Expense = require("../models/expense");

const createExpense = async (req, res) => {
  try {
    const { title, cost, date, isReoccuring } = req.body;
    const newExpense = new Expense({
      title,
      cost,
      date,
      isReoccuring,
    });
    await newExpense.save();
    const expenses = await Expense.find().exec();

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().exec();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve expenses" });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
};
