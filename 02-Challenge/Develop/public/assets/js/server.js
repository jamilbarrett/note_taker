const fs = require('fs')
const express = require('express')
const app = express()
const {v4} = require('uuid')

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

app.post()
