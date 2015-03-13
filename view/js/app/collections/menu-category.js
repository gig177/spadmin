define(function(require) {
    var Backbone = require('lib/backbone'),
        MenuItem = require('app/models/menu-item');

    var MenuCategory = Backbone.Collection.extend({
        model: MenuItem 
    });

    return MenuCategory;
});
