const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const connectDatabase = require("./db");
const routes = require("./routes");
const crypto = require("crypto");

app.use(cors());
app.use(bodyParser.json());

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const secretKey = generateSecretKey();

app.use((req, res, next) => {
  req.secretKey = secretKey;
  next();
});

app.use("/", routes);

connectDatabase().then(() => {
  app.listen(2001, () => {
    console.log("Server started on port 2001");
  });
});
