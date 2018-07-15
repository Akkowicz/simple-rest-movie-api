const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    movie_id: { type: String, required: true },
  },
);
module.exports = mongoose.model('comment', CommentSchema);
