var assert = require('assert'),
    req = require('supertest')('http://localhost:5000'),
    Q = require('q');

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
    return this;
}
SimpleCRUD.prototype.read = function(should) {
    var deferred = Q.defer(),
        self = this;
    this._promise.done(function(item) {
        describe('GET /api/catalog/' + item.id, function() {
            it(should, function(done) {
                req.get('/api/catalog/' + item.id)
                    .set('Content-Type', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
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
        self._promise = deferred.promise;
    });
    return this;
}
SimpleCRUD.prototype.update = function() {
}
SimpleCRUD.prototype.delete = function() {
}

new SimpleCRUD('/api/catalog')
    .create('should create new item')
    .read('should read item');