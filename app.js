require('dotenv').config();

const express = require('express');
const router = require('./router');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Set up the app and its middleware.
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(router);

// Connect to MongoDB using mongoose.
mongoose
  .connect(process.env.DB_URL, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log(`Mongoose default connection open to ${process.env.DB_URL}`);
    app.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log(`App listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
