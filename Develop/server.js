
// Required packages
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const PORT = 3001;

// Middleware
app.use(express.static('./public'));
app.use(express.json());

// Route Paths
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err
        res.send(data)
    })
});


app.post('/api/notes', (req, res) => {
    const notes = req.body

    const newNote = {
        id: uuidv4(),
        ...notes
    };
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;



        const notes = JSON.parse(data)
        notes.push(newNote);

        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), (err) => {
            if (err) throw err;
            return;

        });
        res.json(newNote)
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);

        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.sendStatus(204); // Send a 204 No Content response
        });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () =>
    console.log(`Server started at ${PORT}`));