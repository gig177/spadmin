var cl = console.log;
var should = require('chai').should(),
    Q = require('q'),
    req = require('supertest')('http://localhost:5000');

var page = {
    name: 'r\'o"o?t*/+' // root
};

var url = '/api/catalog';
describe('CREATE', function() {
    before(function(done) {
        setTimeout(function() {
            cl('0');
            done()
        }, 300);
    });
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
                        cl('1');
                        done();
                    });
            }, 350);
        });
        it('should create a new item', function() {
            resp.id.should.be.a('number');
            resp.should.have.property('name', 'root');
            resp.should.have.property('title', 'root');

            resp.created.should.be.a('number');
            new Date(resp.created * 1000).should.be.above(new Date(1000));

            deferred.resolve(resp.id);
        });
    });
    describe('POST ' + url, function() {
        before(function(done) {
            done()
            /*
            deferred.promise.then(function(id) {
                req.post(url)
                    .set('Content-Type', 'application/json')
                    .expect('Content-Type', /json/)
                    .send(page)
                    .expect(403)
                    .end(function(err, res) {
                        should.not.exist(err);
                        resp = res.body;
                        done();
                    });
            });
            */
        });
        it('should throw an error when an item is duplicated', function() {
        });
    });
});
//it('should create a new item' 'should throw an error when an item is duplicated', function() {
