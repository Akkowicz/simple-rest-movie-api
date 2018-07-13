const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movies = require('./routes/movies');
const comments = require('./routes/comments');

const PORT = process.env.PORT || 5000;
const DB = process.env.DBHOST || 'mongodb://localhost/test';
const app = express();

mongoose.connect(DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ message: 'Welcome to our Movie API! Available routes: GET /movies, GET /comments, POST /movies [Movie Title], POST /comments [Movie ID]' }));

app.route('/movies')
  .get(movies.getMovies)
  .post(movies.addMovie);
app.route('/comments/:id')
  .get(comments.getCommentsByFilmId);
app.route('/comments')
  .get(comments.getComments)
  .post(comments.addComment);

app.listen(PORT);
