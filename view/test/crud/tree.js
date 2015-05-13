var cl = console.log;
var assert = require('assert'),
    Q = require('q');
var simple = require('./simple'),
    req = require('./req');

function TreeCRUD(url) {
    simple.SimpleCRUD.apply(this, arguments);
}
TreeCRUD.prototype = new simple.SimpleCRUD();

function BaseValidator() {}
BaseValidator.prototype = new simple.BaseValidator();

module.exports.TreeCRUD = TreeCRUD;
module.exports.BaseValidator = BaseValidator;