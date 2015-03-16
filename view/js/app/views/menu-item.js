define(function(require) {
    var Backbone = require('lib/backbone'),
        swig = require('lib/swig');

    var menuItemTpl = require('tpl!app/templates/menu-item');

    var MenuItemView = Backbone.View.extend({
        tagName: 'li',
        initialize: function() {
            //this.on('change:selected', function(obj) {
            this.listenTo(this.model, 'change:selected', function(obj) {
                cl(obj.attributes, 'change:selected');
                this.addSelected();
            });
        },
        render: function() {
            this.$el.html( swig.run(menuItemTpl, this.model.attributes) );
            return this;
        },
        addSelected: function() {
            this.$el.addClass('active');
            cl('addSelected', this.$el);
        }
    });

    return MenuItemView;
});
