const express = require('express');
const UserControllers = require('./controllers/UserControllers');
const ExpensesControllers = require('./controllers/ExpensesControllers');

const authenticateUser = require('./authMiddleware'); 

const router = express.Router();

//TO-DO: Separate into 2 routes files once these get bigger.
//Users Routes
router.get('/getUsers', authenticateUser, UserControllers.getAllUsers);
router.post('/createUser', UserControllers.createUser);
router.post('/login', UserControllers.userLogin);
router.post('/logout', UserControllers.userLogout);
router.get('/getUserId', UserControllers.getUserIdFromToken);

//Expenses Routes
router.get('/getExpenses', authenticateUser, ExpensesControllers.getAllExpenses);
router.post('/createExpense', authenticateUser, ExpensesControllers.createExpense);

module.exports = router;