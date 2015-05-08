var cl = console.log;
var assert = require('assert'),
    req = require('supertest')('http://localhost:5000'),
    Q = require('q');

req = (function(req) {
    return function(method, url, status, item, validators) {
        validators = validators instanceof Object? [validators]: [];
        var r = req[method](url)
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(status);
        if (validators.length) {
            r.expect(function(res) {
                validators.forEach(function(Validator) {
                    var validator = new Validator();
                    var prop = null;
                    for (prop in validator) {
                        if (validator[prop] instanceof Function) {
                            /*
                            cl('\tprop:', prop);
                            cl('validator[prop]:', validator[prop]);
                            */
                            validator[prop]( res.body[prop] );
                            //cl('---------------------');
                        }
                    }
                });
            });
        }
        if (item instanceof Object)
            r.send(item);
        return r;
    }
})(req);
    

function SimpleCRUD(url) {
    this._url = url;
}
SimpleCRUD.prototype._unifiedRequest = function(method, status, item, should, validators) {
    var deferred = Q.defer();
    var url = this._url;
    if (!(item instanceof Object)) {
        url += '/' + item;
        item = null;
    }
    describe(method + ' ' + url, function() {
        it(should, function(done) {
            req(method.toLowerCase(), url, status, item, validators).end(function(err, res) {
                assert.ifError(err);
                deferred.resolve(res.body.id);
                done();
            });
        });
    });
    return deferred.promise;
}
SimpleCRUD.prototype.create = function(status, item, should, validators) {
    var deferred = Q.defer();
    var url = this._url;
    describe('POST ' + url, function() {
        it(should, function(done) {
            req('post', url, status, item, validators).end(function(err, res) {
                assert.ifError(err);
                deferred.resolve(res.body.id);
                done();
            });
        });
    });
    return deferred.promise;
}
SimpleCRUD.prototype.read = function(status, item, should, validators) {
    return this._unifiedRequest('GET', status, item, should, validators);
}
SimpleCRUD.prototype.put = function(should, id) {
    var deferred = Q.defer();
    var url = this._url + '/' + id;
    describe('PUT ' + url, function() {
        it(should, function(done) {
            req.put(url)
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function(res) {
                    assert(~~res.body.id);
                })
                .end(function(err, res) {
                    assert.ifError(err)
                    setTimeout(function() {
                        deferred.resolve(res.body)
                        done();
                    }, 1500);
                });
        });
    });
    return deferred.promise;
}
SimpleCRUD.prototype.delete = function() {
}

function BaseValidator(item) {}
BaseValidator.prototype.id = function(value) {
    assert(~~value);
}
BaseValidator.prototype.created = function(value) {
    assert(~~value);

    var d = new Date(value * 1000);
}

module.exports.SimpleCRUD = SimpleCRUD;
module.exports.BaseValidator = BaseValidator;