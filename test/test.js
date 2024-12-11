import request from "supertest"
import app from "../app.js"

describe('GET /', function() {
    it('should return status 200 and a message', function(done) {
    request(app)
        .get('/')
        .expect.expect(200)
        .end(function(err, res) {
        if (err) return done(err);
        expect.expect(res.body.message).to.equal('Hello, world!');
        done();
        });
    });
});
