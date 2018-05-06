const express = require('express');

const router = express.Router();

const NoteController = require('./controllers/note.js');

router.get('/notes', NoteController.GetAll);
router.get('/notes/:id', NoteController.GetOne);
router.post('/notes', NoteController.Add);
router.delete('/notes/:id', NoteController.DeleteOne);
router.put('/notes/:id', NoteController.UpdateOne);

module.exports = router;
