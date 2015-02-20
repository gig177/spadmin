define(function(require) {
    //var Backbone = require('lib/backbone');



/*
    var BookView = require('app/views/book'),
        BookModel = require('app/models/book');

    var bookModel = new BookModel({title: 'Js Patterns'});
    var bookView = new BookView({model: bookModel});
    bookView.render({a:' ssssss', b: 'eeee'});
*/

    /*
    var AppRouter = require('app/router'),
        AppView = require('app/views/app');
    */
    var LibraryView = require('app/views/library');

/*
    var books = [
        { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', releaseDate: '2008', keywords: 'JavaScript Programming' },
        { title: 'The Little Book on CoffeeScript', author: 'Alex MacCaw', releaseDate: '2012', keywords: 'CoffeeScript Programming' },
        { title: 'Scala for the Impatient', author: 'Cay S. Horstmann', releaseDate: '2012', keywords: 'Scala Programming' },
        { title: 'American Psycho', author: 'Bret Easton Ellis', releaseDate: '1991', keywords: 'Novel Splatter' },
        { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', releaseDate: '2011', keywords: 'JavaScript Programming' }
    ];
*/



    return function() {
        new LibraryView();
        /*
        new AppRouter();
        new AppView();
        Backbone.history.start();
        */
    }
});
