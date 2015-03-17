define(function(require) {
    var Backbone = require('lib/backbone'),
        swig = require('lib/swig');

    var MenuCategory = require('app/collections/menu-category'),
        MenuCategoryView = require('app/views/menu-category'),
        menuData = require('json!app/data/menu.json');

    var MenuView = Backbone.View.extend({
        id: '_menu',
        className: 'affix',
        initialize: function() {
            this.render();
        },
        render: function() {
            menuData.forEach(function(category) {
                this.renderCategory(category.category, category.list);
            }, this);
            $('._sidebar').append(this.el);
        },
        renderCategory: function(name, dataList) {
            var menuCategoryView = new MenuCategoryView({
                collection : new MenuCategory(dataList)
            });
            this.$el.append( menuCategoryView.render(name).el );
            //cl(menuCategoryView.render(name).el)
        },
    });

    return MenuView;
});
