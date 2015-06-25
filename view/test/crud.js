var cl = console.log;
var expect = require('chai').expect,
    Q = require('q');
var Request = require('./crud/request');

var url = '/api/catalog';
var req = new Request(url);

create()
    .then(read)
    .then(update)
    .then(drop)
    .then(createChildren)
    .then(children);
    /*
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
    });
}
function createChildren() {
    var deferred = Q.defer();
    describe('Create child of root item', function() {
        before(function(done) {
            var self = this;
            req.create({ name : 'root' }).then(function(root) {
                self.root = root;
                req.create({ name : 'child', pid: root.id }).then(function(child) {
                    self.child = child;
                    done();
                });
            });
        });
        after(function(done) {
            var self = this;
            req.delete(self.child.id).then(function() {
                req.delete(self.root.id).then(function() {
                    deferred.resolve();
                    done();
                });
            });
        });
        it('should save pid', function() {
            expect(this.child.pid).to.equal(this.root.id)
        });
    });
    return deferred.promise;
}
function children() {
    var deferred = Q.defer();
    debugger
    describe('GET ' + url + '/:id/children', function() {
        before(function(done) {
            done();
        });
        after(function(done) {
            deferred.resolve();
            done();
        });
        it('blahblah', function() {
        });
    });
    return deferred.promise;
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