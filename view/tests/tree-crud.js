var cl = console.log;
var assert = require('assert');
var req = require('supertest')('http://localhost:5000');

var colors = require('mocha/lib/reporters/base').colors;
colors['diff added'] = '30;42';
colors['diff removed'] = '30;41';

var page = {
    name: 'r\'o"o?t*/+' // root
};

var resp = null;
before(function(done) {
    req.post(url)
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .send(page)
        .expect(201)
        .end(function(err, res) {
            assert.ifError(err);
            resp = res.body;
            done();
        });
});
var url = '/api/catalog';
describe('POST ' + url, function() {
    it('should create a new item', function() {
        assert.equal(resp.id, 35)
        /*
        assert.strictEqual(resp, {
            id: 34,
            name: 'root',
            title: 'root'
        });
        */
    });
});
//it('should create a new item' 'should throw an error when an item is duplicated', function() {
