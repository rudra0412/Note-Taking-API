const express = require('express');
const router = express.Router();
const Note = require('../models/note');
//I have put comments here for more clarity.

// POST /notes/ - Create a new note
router.post('/', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      body: req.body.body,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /notes/:id - Fetch a note by its primary key
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /notes?title=<substring> - Query notes by title substring
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ title: new RegExp(req.query.title, 'i') });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /notes/:id - Update an existing note
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.title = req.body.title || note.title;
    note.body = req.body.body || note.body;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
