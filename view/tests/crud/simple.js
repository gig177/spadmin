var cl = console.log;
var assert = require('assert'),
    Q = require('q');
var req = require('./req');

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
    return this._unifiedRequest('POST', status, item, should, validators);
}
SimpleCRUD.prototype.read = function(status, item, should, validators) {
    return this._unifiedRequest('GET', status, item, should, validators);
}
SimpleCRUD.prototype.put = function(status, item, should, validators) {
    return this._unifiedRequest('PUT', status, item, should, validators);
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