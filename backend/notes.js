const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({ title, body });
        saveNotes(notes);
        console.log(chalk.green.inverse('Note added'));
    } else {
        console.log(chalk.red.inverse('Note title taken'));
    }
};

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

const removeNotes = title => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.bold.inverse('Note removed'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
};

const editNoteTitle = (title, newTitle) => {
    const notes = loadNotes();
    const noteToEdit = notes.find(note => note.title === title);

    if (noteToEdit) {
        noteToEdit.title = newTitle;
        saveNotes(notes);
        console.log(chalk.green.inverse('Note title edited successfully'));
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
};

const editNoteBody = (title, newBody) => {
    const notes = loadNotes();
    const noteToEdit = notes.find(note => note.title === title);

    if (noteToEdit) {
        noteToEdit.body = newBody;
        saveNotes(notes);
        console.log(chalk.green.inverse('Note body edited successfully'));
    } else {
        console.log(chalk.red.inverse('Note not found'));
    }
};

module.exports = {
    addNote,
    loadNotes,
    removeNotes,
    editNoteTitle,
    editNoteBody
};
