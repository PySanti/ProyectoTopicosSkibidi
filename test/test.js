const request   = require('supertest');
const expect    = require('chai').expect;
const app       = require('../app');

describe('GET /', function() {
    it('should return status 200 and a message', function(done) {
    request(app)
        .get('/')
        .expect(200)
        .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.message).to.equal('Hello, world!');
        done();
        });
    });
});
