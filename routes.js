const express = require('express');
const UserControllers = require('./UserControllers');
const authenticateUser = require('./authMiddleware'); // Import the authentication middleware

const router = express.Router();

router.get('/getUsers', authenticateUser, UserControllers.getAllUsers);
router.post('/create', UserControllers.createUser);
router.post('/login', UserControllers.userLogin);
router.post('/logout', UserControllers.userLogout);

module.exports = router;