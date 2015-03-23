define(function(require) {
    require('css!view/ccss/catalog.tree');

    var Backbone = require('lib/backbone'),
        swig = require('lib/swig'),
        $ = require('lib/jquery');

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
        model: node,
        initialize: function(opts) {
            this.url = '/api/catalog/' + (opts.pid? opts.pid + '/children/': '');
        }
    });

    var NodeView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click span': 'getChildren'
        },
        initialize: function() {
        },
        render: function() {
            this.$el.html( swig.run(treeNodeTpl, this.model.attributes) );
            return this;
        },
        getChildren: function(e) {
            /*
            var children = new TreeView(318);
            cl(children.render().el);

            treeView.render().done(function(el) {
                self.$el.append(el);
            });
            */

            var treeView = new TreeView(318);
            var self = this;
            treeView.render().done(function(el) {
                self.$el.append(el);
            });

            /*
            var collection = new col();
            collection.fetch({ reset : true });
            this.model.set('children', collection);
            cl(this.model.attributes);
            */
        }
    });

    var TreeView = Backbone.View.extend({
        tagName: 'ul',
        initialize: function(pid) {
            if (!pid) this.$el.addClass('_treeview');

            this.collection = new col({ pid : pid });
            this.collection.fetch({ reset : true });
        },
        render: function() {
            var dfd = $.Deferred();

            this.listenTo(this.collection, 'reset', function() {
                this.collection.each(function(m) {
                    this.renderNode(m);
                }, this);
                dfd.resolve(this.el);
            });
            return dfd;
        },
        renderNode: function(m) {
            var nodeView = new NodeView({ model : m });
            this.$el.append( nodeView.render().el );
        }
    });

    return TreeView;
});
