const express = require('express');

const router = express.Router();

const NoteController = require('./controllers/note.js');

router.get('/notes', NoteController.GetAll);
router.get('/notes/:id', NoteController.GetById);
router.post('/notes', NoteController.Add);
router.delete('/notes/:id', NoteController.DeleteById);
router.put('/notes/:id', NoteController.UpdateById);

module.exports = router;
