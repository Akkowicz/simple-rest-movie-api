const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movies = require('./routes/movies');
const comments = require('./routes/comments');

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => res.json({ message: 'Welcome to our Movie API! Available routes: GET /movies, GET /comments, POST /movies [Movie Title], POST /comments [Movie ID]' }));

app.listen(PORT);
