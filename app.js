const express = require('express');
const bodyParser = require('body-parser');
const UserControllers = require('./UserControllers');
const uuid = require("uuid/v4");
const app = express();
const { connectDatabase } = require("./db"); // Adjust the path as needed



app.use(bodyParser.json());

app.get('/login', UserControllers.getUserByUsername);
app.post('/create', UserControllers.createUser);

// app.post('/create_user', UserControllers.createUser);
 
// app.post('/change-balance', UserControllers.changeBalance)
connectDatabase().then(() => {
    app.listen(2001, () => {
      console.log("Server started on port 2001");
    });
  });