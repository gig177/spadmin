var cl = console.log;
var should = require('chai').should(),
    Q = require('q'),
    req = require('supertest')('http://localhost:5000');

var page = {
    name: 'r\'o"o?t*/+' // root
};

var url = '/api/catalog';
var deferred = Q.defer();
describe('POST ' + url, function() {
    var resp = null;
    before(function(done) {
        setTimeout(function() {
            req.post(url)
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .send(page)
                .expect(201)
                .end(function(err, res) {
                    should.not.exist(err);
                    resp = res.body;
                    done();
                });
        }, 350);
    });
    it('should create a new item', function() {
        resp.id.should.be.a('number');
        resp.should.have.property('name', 'root');
        resp.should.have.property('segment', 'root');
        //resp.should.have.property('title', 'root');

        //resp.created.should.be.a('number');
        //new Date(resp.created * 1000).should.be.above(new Date(1000));

        deferred.resolve(resp.id);
    });
});
deferred.promise.then(function(id) {
    var deferred = Q.defer();
    describe('GET ' + url + '/' + id, function() {
        before(function(done) {
            req.get(url + '/' + id)
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    resp = res.body;
                    done();
                });
        });
        it('should read the item', function() {
            resp.id.should.be.a('number');
            resp.should.have.property('name', 'root');

            deferred.resolve(id);
        });
    });
    return deferred.promise;
}).then(function(id) {
    var deferred = Q.defer();
    page.name = 'main';
    page.segment = 'main-segment';
    describe('PATCH ' + url + '/' + id, function() {
        before(function(done) {
            req.patch(url + '/' + id)
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .send(page)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    resp = res.body;
                    done();
                });
        });
        it('should update the item', function() {
            resp.id.should.be.a('number');
            resp.should.have.property('name', 'main');
            resp.should.have.property('segment', 'main-segment');

            deferred.resolve(id);
        });
    });
    return deferred.promise;
}).then(function(id) {
    describe('DELETE ' + url + '/' + id, function() {
        before(function(done) {
            req.delete(url + '/' + id)
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    resp = res.body;
                    done();
                });
        });
        it('should delete the item', function() {
        });
    });
});
//it('should throw an error when an item is duplicated', function() {
//it('should create a new item' 'should throw an error when an item is duplicated', function() {
