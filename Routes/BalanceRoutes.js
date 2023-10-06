const express = require('express');
const BalanceControllers = require('../controllers/BalanceControllers');
const authenticateUser = require('../authMiddleware');
const router = express.Router();

router.get('/getBalance', authenticateUser, BalanceControllers.getBalance);
router.put('/setBalance', authenticateUser, BalanceControllers.setBalance);

module.exports = router;
