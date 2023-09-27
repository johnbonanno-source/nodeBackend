const express = require('express');
const BalanceControllers = require('../controllers/BalanceControllers');
// const authenticateUser = require('../authMiddleware'); 
const router = express.Router();

router.get('/getBalance', BalanceControllers.getBalance);

module.exports = router;