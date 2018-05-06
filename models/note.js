const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  body: {
    type: String,
  },
  title: {
    type: String,
  },
});

const NoteModel = mongoose.model('Note', NoteSchema);

module.exports = NoteModel;
