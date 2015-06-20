var cl = console.log;
var chai = require('chai'),
    Request = require('./crud/request');
    //req = require('supertest')('http://localhost:5000');

var expect = chai.expect;
chai.config.showDiff = true; 

var page = {
    name: 'r\'o"o?t*/+' // root
};

var url = '/api/catalog';

var req = new Request(url);
req.create(page, function() {
    it('should create id', function() {
        expect(this.item.id).to.be.a('number');
    });
    it('should create segment', function() {
        expect(this.item.segment).to.equal('root');
    });
    it('should create title', function() {
        expect(this.item).to.have.property('title');
        expect(this.item.title).to.equal('root');
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