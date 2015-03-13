define(function(require) {
    var Backbone = require('lib/backbone'),
        swig = require('lib/swig');

    var MenuCategory = require('app/collections/menu-category'),
        MenuCategoryView = require('app/views/menu-category'),
        menuTpl = require('tpl!app/templates/menu'),
        menuData = require('json!app/data/menu.json');

    var MenuView = Backbone.View.extend({
        el: '._sidebar',
        initialize: function() {
            this.render();
        },
        render: function() {
            /*
            this.categories.forEach(function(category) {
                category.each(function(item) {
                    this.renderMenuItem(item);
                }, this);
            }, this);
            */
            menuData.forEach(function(category) {
                this.renderCategory(category.category, category.list);
            }, this);
            //this.$el.html( swig.run(menuTpl) );
            return this;
        },
        renderCategory: function(name, dataList) {
            var menuCategoryView = new MenuCategoryView({
                collection : new MenuCategory(dataList)
            });
            //cl(menuCategoryView.render(name).el)
        },
        /*
        createCategories: function(categories) {
            return categories.map(function(category) {
                //cl('MenuCategory:', MenuCategory);
                return new MenuCategory(category.list);
            });
        }
        */
    });

    return MenuView;
});
