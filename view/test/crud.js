var cl = console.log;
var chai = require('chai'),
    Q = require('q'),
    Request = require('./crud/request');
    //req = require('supertest')('http://localhost:5000');

var expect = chai.expect;
chai.config.showDiff = true; 


var url = '/api/catalog';
var req = new Request(url);

SimpleCRUD().then(TreeCRUD);
//SimpleCRUD();

function SimpleCRUD() {
    var deferred = Q.defer();

    var page = {
        name: 'r\'o"o?t*/+' // root
    };

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
        req.read(item.id, function() {
            it('should read id', function() {
                expect(this.item.id).to.equal(item.id);
            });
        }).then(function(item) {
            item.title = 'hello';
            req.update(item, function(item) {
                it('title should be updated', function() {
                    expect(this.item.title).to.equal('hello');
                });
            }).then(function() {
                req.delete(item.id, function(resp) {
                    it('request should be done');
                }).then(function() {
                    /*
                    describe('GET ' + url, function() {
                        it('request should be done');
                    });
                    */
                    deferred.resolve();
                });
            });
        });
    });
    return deferred.promise;
}
function TreeCRUD() {
    req.children({
        before: function(done) {
            //req.create({ name : 'root' }).then(function(rootId) { });
            setTimeout(function() {
                cl('before');
                this.resp = { 'hello' : 'lol' };
                done();
            }.bind(this), 300);
        },
        after: function(done, deferred) {
            setTimeout(function() {
                deferred.resolve();
                cl('after');
                done();
            }, 200);
        },
        specs: function() {
            it('request should be done', function() {
                debugger
            });
        }
    });

    /*
    req.create({ name : 'root' }).then(function(rootId) {
        debugger
        describe('GET ' + url, function() {
            it('request should be done');
        });
    });
    */
    /*
    function _createChildren(done) {
        req.create({ name : 'root' }).then(function(rootId) {
            done();
            req.create({ name : 'child-1', pid : rootId }).then(function(id) {
                req.create({ name : 'child-2', pid : rootId }).then(function(id) {
                    deferred.resolve();
                });
            });
        });

        return deferred.promise;
    }
    */
}