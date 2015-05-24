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
        var item = null;
        before(function(done) {
            createItem(url, data).then(function(resp) {
                deferred.resolve(resp);
                item = resp;
                debugger
                done();
            });
        });
        specs(item);
    });
    return deferred.promise;
}
Request.prototype.read = function(id, specs) {
    var deferred = Q.defer();
    var url = this._url + '/' + id;
    describe('GET ' + url, function() {
        var item = null;
        before(function(done) {
            readItem(url).then(function(response) {
                deferred.resolve(response);
                item = response;
                done();
            });
        });
        specs(item);
    });
    return deferred.promise;
}
Request.prototype.update = function(data) {
    var deferred = Q.defer();
    var url = this._url + '/id';
    describe('PATCH ' + url, function() {
        var item = null;
        before(function() {
            updateItem(url, data).then(function(response) {
                deferred.resolve(response);
                item = response;
                done();
            });
        });
    });
    return deferred.promise;
}
Request.prototype.delete = function(id, specs) {
    var deferred = Q.defer();

    var url = this._url + '/id';
    describe('DELETE ' + url, function() {
        var resp = null;
        before(function() {
            deleteItem(url).then(function(response) {
                deferred.resolve();
                resp = response;
                done();
            });
        });
        specs(resp);
    });
}

function createItem(url, data) {
    var deferred = Q.defer();
    setTimeout(function() {
        deferred.resolve({ id: 823 });
    }, 300);
    return deferred.promise;
}
function readItem(url) {
    var deferred = Q.defer();
    setTimeout(function() {
        deferred.resolve({ id: 823 });
    }, 200);
    return deferred.promise;
}
function updateItem(url, data) {
    var deferred = Q.defer();
    setTimeout(function() {
        deferred.resolve({ id: 823 });
    }, 150);
    return deferred.promise;
}
function deleteItem(url) {
    var deferred = Q.defer();
    setTimeout(function() {
        deferred.resolve();
    }, 200);
    return deferred.promise;
}

module.exports = Request;