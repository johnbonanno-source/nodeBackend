const express = require('express');
const UserControllers = require('./controllers/UserControllers');
const ExpensesControllers = require('./controllers/ExpensesControllers');

const authenticateUser = require('./authMiddleware'); 

const router = express.Router();

router.get('/getUsers', authenticateUser, UserControllers.getAllUsers);
router.post('/createUser', UserControllers.createUser);
router.post('/login', UserControllers.userLogin);
router.post('/logout', UserControllers.userLogout);


router.get('/getExpenses', authenticateUser, ExpensesControllers.getAllExpenses);
router.get('/createExpense', authenticateUser, ExpensesControllers.createExpense);

module.exports = router;