const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const NoteModel = mongoose.model('Note', NoteSchema);

module.exports = NoteModel;
