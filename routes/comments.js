const Comment = require('../models/comment');
const Movie = require('../models/movie');

function getCommentsByFilmId(req, res) {
  const searchId = req.params.id || '';
  // imdb ids are min 9 characters long
  if (!searchId || searchId.length < 9) {
    return res.json({ error: 'You need to send a proper IMDB id' });
  }
  Comment.find({ movie_id: searchId }, (err, commentList) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json(commentList);
  });
  return 1;
}

function getComments(req, res) {
  Comment.find({}, (err, commentList) => {
    if (err) {
      return res.json({ error: err });
    }
    return res.json(commentList);
  });
}

function addComment(req, res) {
  const commentObj = {};
  // basic validation
  if (req.body.text && req.body.id) {
    commentObj.text = req.body.text;
    commentObj.movie_id = req.body.id;
    const newComment = new Comment(commentObj);
    // check if movie exists
    Movie.find({ imdbID: commentObj.movie_id }, (err, foundMovie) => {
      if (err) {
        return res.json({ error: err });
      }
      // movie found, adding comment
      if (foundMovie.length) {
        newComment.save((errI, comment) => {
          if (errI) {
            return res.json({ error: errI });
          }
          return res.json({ msg: 'Comment added', comment });
        });
      } else {
        // movie not found, respond with error
        return res.json({ error: 'Movie not found.' });
      }
      return 2;
    });
  } else {
    return res.json({ error: 'You need to send a movie id and a comment.' });
  }
}
module.exports = { getCommentsByFilmId, getComments, addComment };
