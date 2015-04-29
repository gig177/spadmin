var assert = require('assert'),
    req = require('supertest')('http://localhost:5000'),
    Q = require('q');

var deferred = Q.defer();
describe('POST /api/catalog/', function() {
    it('should create new item', function(done) {
        var data = {
            name: 'Barrack'
        };
        req.post('/api/catalog/')
            .set('Content-Type', 'application/json')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect(function(res) {
                assert(~~res.body.id);
            })
            .end(function(err, res) {
                assert.ifError(err)
                deferred.resolve(res.body)
                done()
            });
    });
});