var assert = require('assert'),
    req = require('supertest')('http://localhost:5000'),
    Q = require('q');

var scrud = new SimpleCRUD('/api/catalog');
scrud.create('should create new item');
scrud.read('should read item');

function SimpleCRUD(url) {
    this._url = url;
}
SimpleCRUD.prototype.create = function(should) {
    var deferred = Q.defer();
    describe('POST /api/catalog/', function() {
        it(should, function(done) {
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
    this._promise = deferred.promise;
}
SimpleCRUD.prototype.read = function() {
}
SimpleCRUD.prototype.update = function() {
}
SimpleCRUD.prototype.delete = function() {
}
