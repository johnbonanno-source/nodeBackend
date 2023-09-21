const { Double } = require('bson');
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cost: { type: Number, required: true },
    date: { type: Date, required: true },
    isReoccuring: { type: Boolean, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { collection: 'charges' }
);

module.exports = mongoose.model('Expense', expenseSchema);
