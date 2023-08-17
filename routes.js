const express = require('express');
const UserControllers = require('./UserControllers');

const router = express.Router();

router.get('/getUsers', UserControllers.getAllUsers);
router.post('/create', UserControllers.createUser);
router.post('/login', UserControllers.userLogin);

module.exports = router;