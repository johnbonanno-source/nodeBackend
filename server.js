const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");
const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://Budgethero:eatbutt@cluster0.55ykuqg.mongodb.net/?retryWrites=true&w=majority";
// localhost:2000/login?username=jonh
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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

app.get("/login", login);


const login = (req, res, next) => {
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
};

app.post("/create-user", (req, res, next) => {
  const { username, password } = req.body;
  const uuid = uuid();
  let userCreated = false;
  // user created = (*insert user to database*)//
  if (userCreated) {
    res.status(201).json({ message: "New User Created" });
  } else if (!userCreated) {
    return res.status(422).json({
      message: "Unable to create new user.",
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

  res
    .status(201)
    .json({ message: "Cash succesfully deposit.", balance: changeBalance });
});

app.listen(2000); // start Node + Express server on port 5000

//Withdrawl or deposit, amount, New balance, previous balance, date of change


// to be implemented in future controllers

app.post("/create-user", (req, res, next) => {
  const { username, password } = req.body;
  const uuid = uuid();
  let userCreated = false;
  // user created = (*insert user to database*)//
  if (userCreated) {
    res.status(201).json({ message: "New User Created" });
  } else if (!userCreated) {
    return res.status(422).json({
      message: "Unable to create new user.",
    });
  }
});

// let url = `http://localhost:5000/${usernameValue}`;
// response.data.username === usernameValue && response.data.password===passwordValue
// app.post("/change-balance", (req, res, next) => {
//   const { amount } = req.body;

//   if (!amount || amount <= 0) {
//     return res.status(422).json({
//       message: "Invalid input, please enter a valid amount.",
//     });
//   }

//   const changeBalance = {
//     id: uuid(),
//     changeType,
//     amount,
//     newBalance,
//     previousBalance,
//     date,
//   };

//   res
//     .status(201)
//     .json({ message: "Cash succesfully deposit.", balance: changeBalance });
// });