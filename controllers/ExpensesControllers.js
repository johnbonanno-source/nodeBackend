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

    res.json({ message: "Expense added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
};

const getAllExpenses = async (req, res) => {
    try {
        console.log("called get all expenses");
      const expenses = await Expense.find().exec();
      console.log(expenses);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve expenses" });
    }
  };
  

  module.exports = {
    createExpense,
    getAllExpenses
  }