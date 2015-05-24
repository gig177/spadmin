var cl = console.log;
var should = require('chai').should(),
    Q = require('q');
    //req = require('supertest')('http://localhost:5000');

function Request(url) {
    this._url = url;
}
Request.prototype.create = function(data, specs) {
    var deferred = Q.defer();
    var url = this._url;
    describe('POST ' + url, function() {
        before(function(done) {
            _create(url, data).then(function(resp) {
                deferred.resolve(resp);
                done();
            });
        });
        specs(data)
    });
    return deferred.promise;
}
Request.prototype.read = function(id, specs) {
    var deferred = Q.defer();
    var url = this._url + '/' + id;
    describe('GET ' + url, function() {
        var item = null;
        before(function(done) {
            _read(url).then(function(response) {
                deferred.resolve(response);
                item = response;
                done();
            });
        });
        specs(item);
    });
    return deferred.promise;
}
Request.prototype.update = function(data, specs) {
    var deferred = Q.defer();
    var url = this._url + '/' + data.id;
    describe('PATCH ' + url, function() {
        var item = null;
        before(function(done) {
            _update(url, data).then(function(response) {
                deferred.resolve(response);
                item = response;
                done();
            });
        });
        specs(item);
    });
    return deferred.promise;
}
Request.prototype.delete = function(id, specs) {
    var deferred = Q.defer();
    var url = this._url + '/' + id;
    describe('DELETE ' + url, function() {
        var resp = null;
        before(function() {
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
    setTimeout(function() {
        deferred.resolve({ id: 823 });
    }, 300);
    return deferred.promise;
}
function _read(url) {
    var deferred = Q.defer();
    setTimeout(function() {
        deferred.resolve({ id: 823 });
    }, 200);
    return deferred.promise;
}
function _update(url, data) {
    var deferred = Q.defer();
    setTimeout(function() {
        deferred.resolve({ id: 823 });
    }, 150);
    return deferred.promise;
}
function _delete(url) {
    var deferred = Q.defer();
    setTimeout(function() {
        deferred.resolve();
    }, 200);
    return deferred.promise;
}

module.exports = Request;