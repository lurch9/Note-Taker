const express = require('express');
const paths = require('paths');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('index.html');
});

app.get('/', (req, res) => {
    res.redirect('notes.html');
});

app.listen(PORT, () => {
    console.log(`Server Up in Port ${PORT}`);
});