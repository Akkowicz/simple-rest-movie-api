const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Movie = require('../models/movie');

const should = chai.should();
chai.use(chaiHttp);

// Clean db before tests
describe('Movies', () => {
  before((done) => {
    Movie.remove({}, (err) => {
      done();
    });
  });
  // test get route
  describe('/GET movies', () => {
    it('it should GET all the movies', (done) => {
      chai.request(app)
        .get('/movies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  // test post route
  describe('/POST movies', () => {
    it('it should POST a movie with proper title', (done) => {
      const movie = {
        title: 'Shrek',
      };
      chai.request(app)
        .post('/movies')
        .send(movie)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('movie');
          res.body.movie.should.have.property('Title');
          done();
        });
    });
    it('it should not POST a movie without a title', (done) => {
      const movie = {
        title: '',
      };
      chai.request(app)
        .post('/movies')
        .send(movie)
        .end((err, res) => {
          res.should.have.status(418);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('it should respond properly to random gibberish', (done) => {
      const movie = {
        title: 'asfdsfcxaa^&^^^',
      };
      chai.request(app)
        .post('/movies')
        .send(movie)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.eql('Movie not found in OMDB and database.');
          done();
        });
    });
  });
});
