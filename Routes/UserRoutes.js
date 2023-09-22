const express = require('express');
const UserControllers = require('../controllers/UserControllers');
const authenticateUser = require('../authMiddleware');
const router = express.Router();

router.get('/getUsers', authenticateUser, UserControllers.getAllUsers);
router.post('/createUser', UserControllers.createUser);
router.post('/login', UserControllers.userLogin);
router.post('/logout', UserControllers.userLogout);
router.get('/getUserId', UserControllers.getUserIdFromToken);

module.exports = router;