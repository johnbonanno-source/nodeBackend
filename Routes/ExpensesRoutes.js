const express = require('express');
const ExpensesControllers = require('../controllers/ExpensesControllers');
const authenticateUser = require('../authMiddleware'); 
const router = express.Router();

router.get('/getExpenses', authenticateUser, ExpensesControllers.getAllExpenses);
router.post('/createExpense', authenticateUser, ExpensesControllers.createExpense);

module.exports = router;