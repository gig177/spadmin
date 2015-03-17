window.categoryCollection = [];
define(function(require) {
    var Backbone = require('lib/backbone'),
        swig = require('lib/swig');

    var MenuItemView = require('app/views/menu-item'),
        menuCategoryTpl = require('tpl!app/templates/menu-category');

    var page = require('app/page');

    var MenuCategoryView = Backbone.View.extend({
        initialize: function() {
            page.on('module', function(module) {
                var prevSelected = null,
                    nowSelected = null;
                this.collection.models.forEach(function(model) {
                    //cl(model.attributes)
                    if (module == model.get('href'))
                        nowSelected = model;
                    if (model.has('selected'))
                        prevSelected = model;
                    //cl(model.get('href'))
                });
                if (prevSelected)
                    prevSelected.unset('selected');
                if (nowSelected)
                    nowSelected.set('selected', true);
                //cl(prevSelected, nowSelected);
                //model.set('selected', 1);
            }, this);
        },
        render: function(categoryName) {
            this.$el.html( swig.run(menuCategoryTpl, { categoryName : categoryName }) );
            window.categoryCollection.push(this.collection);
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
