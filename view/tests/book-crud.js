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
(function() {
    var validator = new CreateValidator();
    var prop = null;
    for (prop in validator) {
        if (validator[prop] instanceof Function) {
            cl('\tprop:', prop);
            cl(validator[prop].toString())
        }
    }
})()
*/

var crud = new SimpleCRUD('/api/catalog');
crud.create(201, book, 'should create a new item', CreateValidator)
    /*
    .then(function(id) {
        return crud.create(403, 'should throw an error when an item is duplicated', 403)
    })
    .then(function(id) {
        return crud.create('should read the item', id);
    })
    .then(function(id) {
        return crud.read('should read item', id)
    })
    .then(function(id) {
        return crud.put('should full update item', id);
    })
    */
        /*.then(function() {
            return crud.create('should throw an error when item is conflicted', 409);
        });*/