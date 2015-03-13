define(function(require) {
    var Backbone = require('lib/backbone'),
        swig = require('lib/swig');

    var menuItemTpl = require('tpl!app/templates/menu-item');

    var MenuItemView = Backbone.View.extend({
        tagName: 'li',
        render: function() {
            this.$el.html( swig.run(menuItemTpl, this.model.attributes) );
            return this;
        },
    });

    return MenuItemView;
});
