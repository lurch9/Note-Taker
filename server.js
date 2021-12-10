const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, './public/notes.html'));
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'))
    });


app.get('/api/notes', (req, res) => {
    console.log("Reading notes...");
    try {
        
        const db = fs.readFileSync('./db/db.json', 'utf-8');
        const notes = JSON.parse(db || [])
        res.json(notes);
    }
    catch (error){
        console.log(`Something isn\'t right: ${error}`);
        res.json(error); 
    }
});

app.post('/api/notes', (req, res) => {

    if (req.body) {
        let newNote = req.body;
        newNote.id = uuid();
        const jsonNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
        
        try{
            jsonNotes.push(newNote);
            fs.writeFileSync('./db/db.json', JSON.stringify(jsonNotes));
            
        }
        catch (error){
            console.log(`Something went wrong! Error: ${error}`);
            res.json(error);
        }
        res.json(jsonNotes);
        }

        else{

        console.log('Title or Text empty.')
    
    }

    
})

app.listen(PORT, () => {
    console.log(`Server Up in Port ${PORT}`);
});