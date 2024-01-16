const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

const addNote = (title, body) => {
    const notes = loadNotes()                                                                              //to prevent two notes hsving the same title using array filter method
    const duplicateNotes = notes.filter((note) => note.title === title)          // <--- issue with filter it will keep on finding for other duplicates even if one is found(eg from 1000 u find dup at 89 then it wont stop and keep looking for the other 911 which would never happen)
    const duplicateNote = notes.find((note) => note.title === title)             //<--- finds the first one and stops

    //adding a new note using push method --> array method
    //condition can also be duplicateNote === undefined
    if(!duplicateNote){
        notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('Note  Added'));
    }

    else{
        console.log(chalk.red.inverse('Note Title Taken'));
    }
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e)
    {
        return []
    }

}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.bold.inverse('Note removed'));
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('No Note found'));
    }    

}


const listNotes = () => {
    console.log(chalk.yellow.inverse('Your Notes: '));
    const notes = loadNotes()
    const notesTitle = notes.forEach(note => {
        console.log(note.title);
    });
} 

const readNote = (title) => {
    const notes = loadNotes()
    const noteFound = notes.find((note) => note.title === title)

    if(noteFound){
        console.log('Title: ' + chalk.underline.inverse(noteFound.title));
        console.log('Description: '+ noteFound.body);
    }
    else{
        console.log(chalk.red.inverse('Note not found!'));
    }

}
// module.exports = getNotes

// export more than one things buy passing everything into an object
module.exports = {
    addNote: addNote,
    removeNotes:removeNotes,
    listNotes:listNotes,
    readNote:readNote
}