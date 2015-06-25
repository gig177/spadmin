var cl = console.log;
var expect = require('chai').expect,
    Q = require('q');
var Request = require('./crud/request');

var url = '/api/catalog';
var req = new Request(url);

create()
    .then(read)
    /*
    .then(update)
    .then(drop)
    .then(children);
    */

function create() {
    var page = {
        name: 'r\'o"o?t*/+' // root
    };
    return req.create(page, function() {
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
        return req.create({ name : 'child_1', pid : item.id }, {
            after: function(done) {
                debugger
                done();
            },
            specs: function() {
                it('should save pid', function() {
                    expect(this.item.pid).to.equal(item.id);
                });
            }
        });
    });
}
function read(item) {
    return req.read(item.id, function() {
        it('should read id', function() {
            expect(this.item.id).to.equal(item.id);
        });
    })
}
function update(item) {
    item.title = 'hello';
    return req.update(item, function(item) {
        it('title should be updated', function() {
            expect(this.item.title).to.equal('hello');
        });
    })
}
function drop(item) {
    return req.delete(item.id, function(resp) {
        it('request should be done');
    });
}
function children() {
    return req.children({
        before: function(done) {
            //req.create({ name : 'root' }).then(function(rootId) { });
            req.create({ name : 'root' }).then(function(rootId) {
                debugger
                req.create({ name : 'child-1', pid : rootId }).then(function(id) {
                    done();
                });
            });
            /*
            setTimeout(function() {
                cl('before');
                this.resp = { 'hello' : 'lol' };
                done();
            }.bind(this), 300);
            */
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