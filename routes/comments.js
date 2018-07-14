const mongoose = require('mongoose');
const comment = require('../models/comment');

function getCommentsByFilmId(req, res) {
  console.log('Getting comments for some ID');
  res.send('OK');
}

function getComments(req, res) {
  console.log('Gettings comments');
  res.send('OK');
}

function addComment(req, res) {
  console.log('Adding comment to ID');
  res.send('OK');
}

module.exports = { getCommentsByFilmId, getComments, addComment };
