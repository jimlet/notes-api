const appConfig = require('./config/app');
const dbConfig = require('./config/db');
const express = require('express');
const routes = require('./app/routes');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

// Set up the app.
const app = express();

// Support parsing application/x-www-form-urlencoded and application/json requests.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GREAT LEARNING MOMENT.
// The source tutorial for this work is
// https://medium.freecodecamp.org/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2
// That did things in the old callback way, as commented out here.
// But the MongoClient.connect method returns a promise if you don't pass in a callback to it,
// so prefer that here (see implementation below).
// The whole API is this way - the functions in note_routes used to take (err, data) callbacks
// at the top level instead of thens and catches.

// mongodb.MongoClient.connect(dbConfig.url, (err, database) => {
//   if (err) return console.log(err);

//   // Set up routes.
//   routes(app, database.db('notes-api'));

//   app.listen(port, () => {
//     console.log(`We are live on port ${port}`);
//   });
// });

// Create the db connection and hand it in to the app.
mongodb.MongoClient.connect(dbConfig.url)
  .then((client) => {
    // Set up routes.
    routes(app, client.db(dbConfig.database), dbConfig.collection);

    // Start the app.
    app.listen(appConfig.port, () => {
      console.log(`We are live on port ${appConfig.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
