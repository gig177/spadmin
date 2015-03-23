define(function(require) {
    require('css!view/ccss/catalog.tree');

    var Backbone = require('lib/backbone'),
        swig = require('lib/swig');

    var TreeView = require('app/views/tree');

    var ContentView = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            var treeView = new TreeView();
            var self = this;
            treeView.render().done(function(el) {
                self.$el.append(el);
            });
            $('._content').append(this.el);
        }
    });

    return ContentView;
});
