define(function(require) {
    require('css!view/ccss/catalog.tree');

    var Backbone = require('lib/backbone'),
        swig = require('lib/swig');

    var treeNodeTpl = require('tpl!app/templates/tree-node');

    var countries = [
        { 'name' : 'ОАЭ', 'eid' : 1 },
        { 'name' : 'Великобритания', 'eid' : 318 }
    ];

    var node = Backbone.Model.extend({
        defaults: {
            name : null
        }
    });

    var col = Backbone.Collection.extend({
        model : node
    });

    var NodeView = Backbone.View.extend({
        tagName: 'li',
        render: function() {
            this.$el.html( swig.run(treeNodeTpl, this.model.attributes) );
            return this;
        }
    });

    var TreeView = Backbone.View.extend({
        tagName: 'ul',
        className: '_treeview',
        initialize: function() {
            this.collection = new col(countries);
            this.render();
        },
        render: function() {
            this.collection.each(function(m) {
                this.renderNode(m);
            }, this);
            $('._content').append(this.el);
        },
        renderNode: function(m) {
            var nodeView = new NodeView({ model : m });
            this.$el.append( nodeView.render().el );
        }
    });

    return TreeView;
});
