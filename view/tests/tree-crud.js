var cl = console.log;
var tree = require('./crud/tree');
var assert = require('assert');

var page = {
    name: 'r\'o"o?t*/+' // root
};

var crud = new tree.TreeCRUD('/api/catalog');
crud.create(201, page, 'should create a new item', CreateValidator);


function CreateValidator() {}
CreateValidator.prototype = new tree.BaseValidator();
CreateValidator.prototype.name = function(value) {
    assert.equal(value, 'root');
}
CreateValidator.prototype.title = function(value) {
    assert.equal(value, 'root');
}