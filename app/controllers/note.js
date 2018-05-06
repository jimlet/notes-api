const Note = require('../../models/note.js');

const NoteController = {
  GetAll(req, res) {
    Note.find({})
      .then((notes) => {
        if (notes) {
          res.send(notes);
        } else {
          res.status(404).send('Not found');
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  GetOne(req, res) {
    Note.findById(req.params.id)
      .then((note) => {
        if (note) {
          res.send(note);
        } else {
          res.status(404).send('Not found');
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  Add(req, res) {
    new Note(req.body)
      .save()
      .then((note) => {
        res.send(note);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  UpdateOne(req, res) {
    Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updated) => {
        if (updated) {
          res.send(updated);
        } else {
          res.status(404).send('Not found');
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  DeleteOne(req, res) {
    Note.findByIdAndRemove({ _id: req.params.id })
      .then((removed) => {
        if (removed) {
          res.send(`Note ${req.params.id} deleted.`);
        } else {
          res.status(404).send('Not found');
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};

module.exports = NoteController;
