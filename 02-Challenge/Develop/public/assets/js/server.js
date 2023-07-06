const fs = require('fs')
const express = require('express')
const app = express()
const {v4} = require('uuid')
const PORT = 3001
const path = require('path')

app.use(express.static('public'))



app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html' )
})

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html')
})

app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        if(err) throw err
        res.send(data)
    })
})

app.post('/api/notes', (req, res) => {
    const filePath = path.join(__dirname, '/db.json')

    const notes = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  
    const newNote = {
      id: uuidv4(),
      ...req.body
    };
  

    notes.push(newNote)
  
    fs.writeFile(filePath, JSON.stringify(notes, null, 2))
  
    // Send the new note as the response
    res.status(201).json(newNote)
  });

app.listen(PORT, () =>
console.log('Server started at  http://localhost:${PORT}'))