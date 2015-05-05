var cl = console.log;
var assert = require('assert'),
    req = require('supertest')('http://localhost:5000'),
    Q = require('q');

function SimpleCRUD(url) {
    this._url = url;
}
SimpleCRUD.prototype.create = function(should, status) {
    var deferred = Q.defer();
    var url = this._url;
    describe('POST ' + url, function() {
        it(should, function(done) {
            var data = {
                name: 'Barrack'
            };
            req.post(url)
                .set('Content-Type', 'application/json')
                .send(data)
                .expect('Content-Type', /json/)
                .expect(201)
                .expect(function(res) {
                    assert(~~res.body.id);
                })
                .end(function(err, res) {
                    assert.ifError(err)
                    deferred.resolve(res.body.id)
                    done()
                });
        });
    });
    return deferred.promise;
}
SimpleCRUD.prototype.read = function(should, id) {
    var deferred = Q.defer();
    var url = this._url + '/' + id;
    describe('GET ' + url, function() {
        it(should, function(done) {
            req.get(url)
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function(res) {
                    assert(~~res.body.id);
                })
                .end(function(err, res) {
                    assert.ifError(err)
                    deferred.resolve(res.body.id)
                    done()
                });
        });
    });
    return deferred.promise;
}
SimpleCRUD.prototype.put = function(should, id) {
    var deferred = Q.defer();
    var url = this._url + '/' + id;
    describe('PUT ' + url, function() {
        it(should, function(done) {
            req.put(url)
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function(res) {
                    assert(~~res.body.id);
                })
                .end(function(err, res) {
                    assert.ifError(err)
                    setTimeout(function() {
                        deferred.resolve(res.body)
                        done();
                    }, 1500);
                });
        });
    });
    return deferred.promise;
}
SimpleCRUD.prototype.delete = function() {
}

var book = {
    name: 'JavaScript: The Definitive Guide 6th',
    author: 'David Flanagan',
    pages: 1032,
    released: '2015-03',
    lang: en
};
function BaseValidator() {
}

var crud = new SimpleCRUD('/api/catalog');
crud.create('should create a new item', 201, BaseValidator)
    .then(function(id) {
        return crud.create('should throw an error when an item is duplicated', 403)
        /*.then(function() {
            return crud.create('should throw an error when item is conflicted', 409);
        });*/
    })
    .then(function(id) {
        return crud.create('should read the item', id);
    })
    .then(function(id) {
        return crud.read('should read item', id)
    })
    .then(function(id) {
        return crud.put('should full update item', id);
    })
