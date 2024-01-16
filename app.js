const yargs = require('yargs')
const notes = require('./notes.js')
yargs.version('1.2.3')

yargs.command({
    command: 'add',                                                                     // <--- command name
    describe: 'Add a new note',                                             // <--- description of what it does
    builder: {
        title: {                                                            //optional as in if not provided it still works unless the demandOption property is provided
            demandOption: true,                                                 // if command is node app.js add --title --> UNLESS type property is provided it will set title as true(bool)
            type:'string',  
            describe: 'Note title: '
        },
        body: {
            demandOption: true ,
            describe: 'Type your note',
            type: 'string'
        }
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)                                      // <--- code that will run when the command is pressed
        
    
})


yargs.command({
    command: 'remove',                                                          // <--- command name
    describe: 'remove a note',                                              // <--- description of what it does(optional)
    builder:{
    title: {
        type: 'string',
        demandOption: true,
        describe: 'note to be removed'

    }
},
    handler: (argv) => notes.removeNotes(argv.title)                                            // <--- code that will run when the command is pressed
   

})

                                                                            // create list command
yargs.command({
command: 'list',                                                            // <--- command name
describe: 'list all your notes',                                             // <--- description of what it does(optional)
handler: () =>  notes.listNotes()                                                   // <--- code that will run when the command is pressed
})

                                                                            // create read command
yargs.command({
    command: 'read',                                                        // <--- command name
    describe: 'read a note', 
    builder: {
        title:{
            type: 'string',
            demandOption: true,
            describe: 'Give the note title'
        }
    },                                             // <--- description of what it does(optional)
    handler: (argv) =>  notes.readNote(argv.title)                                                       // <--- code that will run when the command is pressed
}
)
// ye karna zaroori h 
yargs.parse()



