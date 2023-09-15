const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDatabase = require("./db");
const routes = require("./routes");
const crypto = require("crypto");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};
const secretKey = generateSecretKey();
app.use((req, res, next) => {
  req.secretKey = secretKey;
  next();
});

app.use("/", routes);
app.get("/test", (req, res) => {
  console.log("Parsed Cookies:", req.cookies);
  res.send("Check console for parsed cookies.");
});

connectDatabase().then(() => {
  app.listen(2001, () => {
    console.log("Server started on port 2001");
  });
});
