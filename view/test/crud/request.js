var cl = console.log;
var should = require('chai').should(),
    Q = require('q'),
    req = require('supertest')('http://localhost:5000');

function Request(url) {
    this._url = url;
}
Request.prototype.create = function(data, specs) {
    var deferred = Q.defer();
    var url = this._url;
    describe('POST ' + url, function() {
        before(function(done) {
            _create(url, data).then(function(response) {
                deferred.resolve(response);
                this.item = response;
                done();
            }.bind(this));
        });
        specs();
    });


    return deferred.promise;
}
Request.prototype.read = function(id, specs) {
    var deferred = Q.defer();
    var url = this._url + '/' + id;
    describe('GET ' + url, function() {
        before(function(done) {
            _read(url).then(function(response) {
                deferred.resolve(response);
                this.item = response;
                done();
            }.bind(this));
        });
        specs();
    });
    return deferred.promise;
}
Request.prototype.update = function(data, specs) {
    var deferred = Q.defer();
    var url = this._url + '/' + data.id;
    describe('PATCH ' + url, function() {
        before(function(done) {
            _update(url, data).then(function(response) {
                deferred.resolve(response);
                this.item = response;
                done();
            });
        });
        specs();
    });
    return deferred.promise;
}
Request.prototype.delete = function(id, specs) {
    var deferred = Q.defer();
    var url = this._url + '/' + id;
    describe('DELETE ' + url, function() {
        var resp = null;
        before(function(done) {
            _delete(url).then(function(response) {
                deferred.resolve();
                resp = response;
                done();
            });
        });
        specs(resp);
    });
    return deferred.promise;
}

function _create(url, data) {
    var deferred = Q.defer();
    req.post(url)
        .send(data)
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
            should.not.exist(err);
            deferred.resolve(res.body);
        });
    return deferred.promise;
}
function _read(url) {
    var deferred = Q.defer();
    req.get(url)
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            should.not.exist(err);
            deferred.resolve(res.body);
        });
    return deferred.promise;
}
function _update(url, data) {
    var deferred = Q.defer();
    req.patch(url)
        .send(data)
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            should.not.exist(err);
            deferred.resolve(res.body);
        });
    return deferred.promise;
}
function _delete(url) {
    var deferred = Q.defer();
    req.delete(url)
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(202)
        .end(function(err, res) {
            should.not.exist(err);
            deferred.resolve(res.body);
        });
    return deferred.promise;
}

module.exports = Request;