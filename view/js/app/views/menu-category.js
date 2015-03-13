define(function(require) {
    var Backbone = require('lib/backbone'),
        swig = require('lib/swig');

    var MenuItemView = require('app/views/menu-item'),
        menuCategoryTpl = require('tpl!app/templates/menu-category');

    var MenuCategoryView = Backbone.View.extend({
        render: function(categoryName) {
            this.$el.html( swig.run(menuCategoryTpl, { categoryName : categoryName }) );
            this.collection.each(function(item) {
                this.renderMenuItem(item);
            }, this);
            return this;
        },
        renderMenuItem: function(item) {
            var menuItemView = new MenuItemView({ model : item });
            this.$el.find('ul').append( menuItemView.render().el );
        }
    });
    return MenuCategoryView;
});
