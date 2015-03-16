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
                this.model.has('selected')?
                    this.$el.addClass('active'):
                    this.$el.removeClass('active');
            });
        },
        render: function() {
            this.$el.html( swig.run(menuItemTpl, this.model.attributes) );
            return this;
        }
    });

    return MenuItemView;
});
