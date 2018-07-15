const request = require('request');
const Movie = require('../models/movie');

// free, limited api key for ease of deployment
const omdbAPIKey = '5ff31858';

function getMovies(req, res) {
  Movie.find({}, (err, movieList) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json(movieList);
  });
}

function addMovie(req, res) {
  const movieToAdd = req.body.title || '';
  // don't spam OMDB with useless requests
  if (!movieToAdd || movieToAdd.length >= 300) {
    // teapot
    res.status(418);
    return res.json({ error: 'You need to set a movie title.' });
  }
  request(`http://www.omdbapi.com/?apikey=${omdbAPIKey}&t=${movieToAdd}`, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const apiData = JSON.parse(body);
      if (apiData.Response === 'True') {
        const newMovie = new Movie(apiData);
        if (apiData.Type !== 'movie') {
          return res.json({ error: 'It\'s not a movie' });
        }
        // check for duplicates
        Movie.find({ Title: newMovie.Title }, (err, foundMovie) => {
          if (err) {
            return res.json({ error: err });
          }
          if (!foundMovie.length) {
            // add if not found
            newMovie.save((errI, movie) => {
              if (errI) {
                return res.json({ error: errI });
              }
              return res.json({ msg: 'Movie added.', movie });
            });
          } else {
            return res.json({ msg: 'Movie already in DB.', movie: foundMovie });
          }
          return 3;
        });
      } else {
        return res.json({ error: 'Movie not found in OMDB and database.' });
      }
    }
    return 4;
  });
  return 5;
}

module.exports = { getMovies, addMovie };
