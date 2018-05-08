const express = require('express');

const router = express.Router();

const noteController = require('./controllers/note.js');

router.get('/notes', noteController.getAll);
router.get('/notes/:id', noteController.getById);
router.post('/notes', noteController.add);
router.delete('/notes/:id', noteController.deleteById);
router.put('/notes/:id', noteController.updateById);

module.exports = router;
