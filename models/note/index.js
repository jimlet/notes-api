const mongoose = require('mongoose');
const validator = require('./validate');

const NoteSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      validate: [{ validator: validator.validateTitle, msg: 'Invalid title' }],
    },
  },
  { timestamps: true },
);

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
