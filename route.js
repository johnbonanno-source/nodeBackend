const express = require('express');
const bodyParser = require('body-parser');
const UserControllers = require('./mongoose');
const uuid = require("uuid/v4");
const app = express();


app.use(bodyParser.json());

app.get('/login', UserControllers.getUserByUsername);
app.post('/create', UserControllers.createUser);

// app.post('/create_user', UserControllers.createUser);
 
// app.post('/change-balance', UserControllers.changeBalance)

app.listen(2001);