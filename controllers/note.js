const NoteModel = require('../models/note');

// TODO: split any fetching, input validation/standardization, etc. out of here into a service.

module.exports = {
  getAll(req, res) {
    return NoteModel.find({})
      .then((notes) => {
        if (!notes || notes.length === 0) {
          return res.status(404).send('Not found');
        }
        return res.send(notes);
      })
      .catch(err => res.status(500).send(err));
  },
  getById(req, res) {
    return NoteModel.findById(req.params.id)
      .then((note) => {
        if (!note) {
          return res.status(404).send('Not found');
        }
        return res.send(note);
      })
      .catch(err => res.status(500).send(err));
  },
  add(req, res) {
    return new NoteModel(req.body)
      .save()
      .then(note => res.send(note))
      .catch(err => res.status(500).send(err));
  },
  updateById(req, res) {
    return NoteModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updated) => {
        if (!updated) {
          return res.status(404).send('Not found');
        }
        return res.send(updated);
      })
      .catch(err => res.status(500).send(err));
  },
  deleteById(req, res) {
    return NoteModel.findByIdAndRemove({ _id: req.params.id })
      .then((removed) => {
        if (!removed) {
          return res.status(404).send('Not found');
        }
        return res.send(`Note ${req.params.id} deleted.`);
      })
      .catch(err => res.status(500).send(err));
  },
};
