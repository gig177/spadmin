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
    .then(recursiveDrop)
    //.then(createChildren)
    //.then(children);
    //.then(treeTraversal);
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
/*
function treeTraversal() {
    var deferred = Q.defer();
    describe('Tree traversal', function() {
        beforeEach(function(done) {
            var self = this;
            req.create({ name : 'root' }).then(function(root) {
                self.root = root;
                req.create({ name : 'child_1', pid: root.id }).then(function(child) {
                    self.child = child;
                    done();
                });
            });
        });
        afterEach(function(done) {
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
            //expect(this.child.pid).to.equal(this.root.id)
        });
    });
    return deferred.promise;
}
*/
function createChildren() {
    var deferred = Q.defer();
    describe('Create child of root item', function() {
        beforeEach(function(done) {
            var self = this;
            req.create({ name : 'root' }).then(function(root) {
                self.root = root;
                req.create({ name : 'child', pid: root.id }).then(function(child) {
                    self.child = child;
                    done();
                });
            });
        });
        afterEach(function(done) {
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
            //expect(this.child.pid).to.equal(this.root.id)
        });
    });
    return deferred.promise;
}
function children() {
    var deferred = Q.defer();
    debugger
    describe('GET ' + url + '/:id/children', function() {
        beforeEach(function(done) {
            done();
        });
        afterEach(function(done) {
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
function recursiveDrop() {
    var deferred = Q.defer();
    describe('Recursive drop', function() {
        beforeEach(function(done) {
            var self = this;
            req.create({ name : 'root' }).then(function(root) {
                self.root = root;
                req.create({ name : 'child_1', pid: root.id }).then(function(child_1) {
                    self.child_1 = child_1;
                    return req.create({ name : 'child_11', pid: child_1.id}).then(function(child_11) {
                        self.child_11 = child_11;
                    });
                }).then(function() {
                    req.create({ name : 'child_2', pid: root.id }).then(function(child_2) {
                        self.child_2 = child_2;
                        done();
                    });
                });
            });
        });
        afterEach(function(done) {
            var self = this;
            req.drop(self.child_1.id).then(function() {
                req.delete(self.root.id).then(function() {
                    deferred.resolve();
                    done();
                });
            });
            done();
        });
        it('should save pid', function() {
            //expect(this.child.pid).to.equal(this.root.id)
        });
    });
    return deferred.promise;
}
