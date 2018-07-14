const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movies = require('./routes/movies');
const comments = require('./routes/comments');

const PORT = process.env.PORT || 5000;
const DB = 'mongodb://localhost:27017/test';
const app = express();

mongoose.connect(DB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

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
