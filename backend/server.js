const express = require('express');
const bodyParser = require('body-parser');
const notes = require('./notes.js'); // Assuming the provided code is in notes.js
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/notes', (req, res) => {
    const { title, body } = req.body;
    notes.addNote(title, body);
    res.status(201).send();
});

app.get('/notes', (req, res) => {
    res.send(notes.loadNotes());
});

app.delete('/notes/:title', (req, res) => {
    const { title } = req.params;
    console.log(`Received request to delete note with title: ${title}`); // Debugging line
    notes.removeNotes(decodeURIComponent(title));
    res.status(204).send();
});

app.put('/notes/:title', (req, res) => {
    const { title } = req.params;
    const { body } = req.body;
    console.log(`Received request to edit note with title: ${title}`); // Debugging line
    notes.editNoteTitle(title, body);
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
