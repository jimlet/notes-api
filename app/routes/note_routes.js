// This is a helper function for creating ObjectID objects for Mongo.
// Mongo won't accept strings as ID params.
const mongodb = require('mongodb');

module.exports = (app, db, collection) => {
  app.get('/notes/:id', (req, res) => {
    // Note the ":" syntax here - params prefixed with : in the
    // URI are available by name in the req.params collection
    const query = { _id: new mongodb.ObjectID(req.params.id) };

    db
      .collection(collection)
      .findOne(query)
      .then((item) => {
        if (item) {
          res.send(item);
        } else {
          res.status(404).send('Not found');
        }
      })
      .catch((err) => {
        res.status(500).send({ error: `An error has occured: ${err}` });
      });
  });

  app.post('/notes', (req, res) => {
    // Remember when testing via Postman or other tool that we need to
    // change the Content-Type header (application/json or application/x-www-form-urlencoded)
    // to match the type of body we're testing this with. In Postman, the body and
    // Content-Type header must be congruent, or our body parser will, for example,
    // parse JSON as form data and mash it into a weird stringified key-value pair.

    // console.log(req.body);
    // res.send('Hi');

    const note = {
      text: req.body.body,
      title: req.body.title,
    };

    db
      .collection(collection)
      .insert(note)
      .then((result) => {
        res.send(result.ops[0]);
      })
      .catch((err) => {
        res.status(500).send({ error: `An error has occured: ${err}` });
      });
  });

  app.delete('/notes/:id', (req, res) => {
    const query = { _id: new mongodb.ObjectID(req.params.id) };

    db
      .collection(collection)
      // The bool here limits it to removing just one doc.
      // Since we're only supporting by ID in the API, this
      // is a good option and helps avoid bugs in passing a broader
      // query and deleting more than is intended.
      .remove(query, true)
      .then((result) => {
        if (result.result.n === 1) {
          res.send(`Note ${req.params.id} deleted.`);
        } else {
          res.status(404).send('Not found');
        }
      })
      .catch((err) => {
        res.status(500).send({ error: `An error has occured: ${err}` });
      });
  });

  app.put('/notes/:id', (req, res) => {
    const query = { _id: new mongodb.ObjectID(req.params.id) };

    const note = {
      text: req.body.body,
      title: req.body.title,
    };

    db
      .collection(collection)
      .update(query, note)
      .then((result) => {
        res.send(note);
      })
      .catch((err) => {
        res.status(500).send({ error: `An error has occured: ${err}` });
      });
  });
};
