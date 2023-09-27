const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDatabase = require('./db');
const crypto = require('crypto');
const ExpensesRoutes = require('./Routes/ExpensesRoutes');
const UsersRoutes = require('./Routes/UserRoutes');
const BalanceRoutes = require('./Routes/BalanceRoutes');

const app = express();

const path = require('path');

// app.use(express.static(__dirname));

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
app.use('/balance', BalanceRoutes);

// app.get("/*", function(req, res) {
//   const indexPath = path.resolve(__dirname, '../budgetingTool/public/index.html');
//   res.sendFile(indexPath, (err) => {
//     if (err) {
//       console.error('Error sending file:', err);
//     } else {
//       console.log('File sent successfully.');
//     }
//   });});
connectDatabase().then(() => {
  app.listen(2001, () => {
    console.log('Server started on port 2001');
  });
});
