define(function(require) {
    var Backbone = require('lib/backbone'),
        swig = require('lib/swig'),
        menuTpl = require('app/templates/menu');

    var MenuView = Backbone.View.extend({
        el: '._sidebar',
        initialize: function() {
            this.render();
        },
        render: function() {
            cl( this.$el );
        }
    });
    return MenuView;
    

    return null;

/*
    var Backbone = require('lib/backbone'),
        Library = require('app/collections/library'),
        Book = require('app/models/book'),
        BookView = require('app/views/book');

    var LibraryView = Backbone.View.extend({
        el: '#_main',
        events: {
            'click button[type=submit]': 'addBook'
        },
        addBook: function(e) {
            e.preventDefault();
            var formData = {};
            $('form input[type=text]').each(function(i, el) {
                if ($(el).val() && el.id)
                    formData[el.id] = $(el).val();
            });
            cl(formData);

            this.collection.create(formData);
        },
        initialize: function() {
            this.collection = new Library();
            this.collection.fetch({reset: true});
            //this.render();

            this.listenTo(this.collection, 'add', this.renderBook);
            this.listenTo(this.collection, 'reset', this.render);
        }, 
        render: function() {
            this.collection.each(function(item) {
                this.renderBook(item);
            }, this);
        }
        ,
        renderBook: function(item) {
            var bookView = new BookView({model: item});
            $('#_books').append( bookView.render().el );
        }
    });

    return LibraryView;
    */
});
