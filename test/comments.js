const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Comment = require('../models/comment');
const movieTest = require('./movies');
const should = chai.should();
chai.use(chaiHttp);

// Clean db before tests
describe('Comments', () => {
  before((done) => {
    Comment.remove({}, (err) => {
      done();
    });
  });
  // test get route
  describe('/GET comments', () => {
    it('it should GET all the comments', (done) => {
      chai.request(app)
        .get('/comments')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  // test post route
  describe('/POST comments', () => {
    it('it should POST a comment about a movie with proper ID', (done) => {
      const comment = {
        id: 'tt0126029',
        text: 'Cucumba!',
      };
      chai.request(app)
        .post('/comments')
        .send(comment)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('comment');
          res.body.comment.should.have.property('text');
          done();
        });
    });
    it('it should not POST a comment without an id', (done) => {
      const movie = {
        text: 'Gimme my id back!',
      };
      chai.request(app)
        .post('/comments')
        .send(movie)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('it should respond properly to random gibberish', (done) => {
      const comment = {
        id: 'asfdsfcxaa^&^^^',
        text: 'asdaxccdsc',
      };
      chai.request(app)
        .post('/comments')
        .send(comment)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.eql('Movie not found.');
          done();
        });
    });
  });
});
