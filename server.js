const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");

const app = express();

const DUMMY_CHANGE_BALANCE = [1, 2]; // not a database, just some in-memory storage for now which resets when we terminate the server

const usersTable = [
  {
    id: uuid(),
    username: "john",
    password: "p",
  },
]; // MOCK DATA

app.use(bodyParser.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.get("/login/", (req, res, next) => {
  const username = req.query.username;
  let userFound = false;
  console.log(req.body);
  usersTable.forEach((user) => {
    if (user["username"] === username) {
      userFound = true;
      res.status(200).json({ user: user });
    }
  });

  if (!userFound) {
    res.status(422).json({
      message: "Username not found",
    });
  }
});

// let url = `http://localhost:5000/${usernameValue}`;
// response.data.username === usernameValue && response.data.password===passwordValue

app.post("/change-balance", (req, res, next) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(422).json({
      message: "Invalid input, please enter a valid amount.",
    });
  }

  const changeBalance = {
    id: uuid(),
    changeType,
    amount,
    newBalance,
    previousBalance,
    date,
  };

  //DUMMY_CHANGE_BALANCE.push(changeBalance);

  res
    .status(201)
    .json({ message: "Cash succesfully deposit.", balance: changeBalance });
});

app.listen(2000); // start Node + Express server on port 5000

//Withdrawl or deposit, amount, New balance, previous balance, date of change
