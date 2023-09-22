const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDatabase = require('./db');
const crypto = require('crypto');
const ExpensesRoutes = require('./Routes/ExpensesRoutes');
const UsersRoutes = require('./Routes/UserRoutes');

const app = express();

app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();

app.use((req, res, next) => {
  req.secretKey = secretKey;
  next();
});

app.use('/users', UsersRoutes);
app.use('/expenses', ExpensesRoutes);

connectDatabase().then(() => {
  app.listen(2001, () => {
    console.log('Server started on port 2001');
  });
});
