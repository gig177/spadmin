var cl = console.log;
var should = require('chai').should(),
    Q = require('q'),
    req = require('supertest')('http://localhost:5000');

var page = {
    name: 'r\'o"o?t*/+' // root
};

var url = '/api/catalog';

describe('CREATE ', function() {
    (function() {
        describe('POST ' + url, function() {
            var deferred = Q.defer();
            it('should create a new item', function(done) {
                setTimeout(function() {
                    deferred.resolve({ id: 823 });
                    done();
                }, 300);
            });
        return deferred.promise;
    })().then(function(item) {
        var deferred = Q.defer();
        describe('blabla', function() {
            it('should throw an error when an item is duplicated', function(done) {
                debugger
                setTimeout(function() {
                    deferred.resolve({ id: 823 });
                    done();
                }, 200);
            });
        });
        return deferred.promise;
    }).then(function(item) {
        cl('next');
    });
});
