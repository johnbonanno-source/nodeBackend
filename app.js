const express = require('express');
const bodyParser = require('body-parser');
const UserControllers = require('./UserControllers');
const app = express();
const cors = require('cors'); 
const { connectDatabase } = require("./db"); 


app.use(cors());
app.use(bodyParser.json());

app.get('/getUsers', UserControllers.getAllUsers);
app.post('/create', UserControllers.createUser);
app.post('/login', UserControllers.userLogin);
 
// app.post('/change-balance', UserControllers.changeBalance)
connectDatabase().then(() => {
    app.listen(2001, () => {
      console.log("Server started on port 2001");
    });
  });