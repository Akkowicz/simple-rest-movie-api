const mongoose = require('mongoose');
const movie = require('../models/movie');

function getMovies(req, res) {
  console.log('Getting movies');
  res.send('OK');
}

function addMovie(req, res) {
  console.log(`Trying to add movie`);
  res.send('OK');
}

module.exports = { getMovies, addMovie };
