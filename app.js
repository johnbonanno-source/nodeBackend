const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const connectDatabase = require('./db');
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);

connectDatabase().then(() => {
  app.listen(2001, () => {
    console.log("Server started on port 2001");
  });
});