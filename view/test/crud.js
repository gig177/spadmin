var cl = console.log;
var should = require('chai').should(),
    Q = require('q');
    Request = require('./crud/request');
    //req = require('supertest')('http://localhost:5000');

var page = {
    name: 'r\'o"o?t*/+' // root
};

var url = '/api/catalog';

var req = new Request(url);
req.create(page, function(item) {
    it('should create an autoincremented id', function() {
        //item.id checking
    });
    it('should create title field', function() {
        //item.title checking
    });
}).then(function(item) {
    req.read(item.id, function(item) {
        it('should read id', function() {
        });
    }).then(function(item) {
        item.title = 'hello';
        req.update(item, function(item) {
            it('title should be updated', function() {
                //item.title checking
            });
        }).then(function() {
            req.delete(item.id, function(resp) {
                it('blabla', function() {
                });
            })
        });
    });
});