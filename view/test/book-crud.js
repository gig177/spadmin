var cl = console.log;
var SimpleCRUD = require('./crud/simple').SimpleCRUD,
    BaseValidator = require('./crud/simple').BaseValidator;
var assert = require('assert');

var book = {
    name: 'JavaScript: The Definitive Guide 6th',
    author: 'David Flanagan',
    pages: 1032,
    released: '2015-03',
    lang: 'en'
};

function CreateValidator() {}
CreateValidator.prototype = new BaseValidator();

/*
var crud = new SimpleCRUD('/api/catalog');
crud.create(201, book, 'should create a new item', CreateValidator)
    .then(function() {
        return crud.create(403, book, 'should throw an error when an item is duplicated');
    })
    .then(function(id) {
        return crud.read(200, id, 'should read the item');
    })
    .then(function(id) {
        return crud.put(200, id, 'should full update the item');
        .then(function(id) {
            return crud.put(403, id, 'should full update the item');
        });
    })
        .then(function() {
            return crud.create('should throw an error when item is conflicted', 409);
        });
*/