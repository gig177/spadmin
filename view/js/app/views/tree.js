define(function(require) {
    require('css!view/ccss/catalog.tree');

    require('lib/velocity');
    require('lib/velocity.ui');

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
            'click i': 'getChildren'
        },
        initialize: function() {
        },
        render: function() {
            this.$el.html( swig.run(treeNodeTpl, this.model.attributes) );
            return this;
        },
        setLoadingIcon: function() {
            this.$el.children('i').attr('class', 'glyphicon glyphicon-refresh fa-spin');
        },
        setDefaultIcon: function() {
            this.$el.children('i').attr('class', 'glyphicon glyphicon-circle-arrow-right');
        },
        setOpenIcon: function() {
            this.$el.children('i').attr('class', 'glyphicon glyphicon-circle-arrow-down');
        },
        getChildren: function(e) {
            e.stopPropagation();
            //this.setLoadingIcon();

            /*
            this.$el.find('i').velocity({ rotateZ : '45deg' }, { duration : 100, complete : function() {
            }});
            */
            var childrenView = new TreeChildrenView( this.model.get('eid') );
            var self = this;
            childrenView.render().done(function(el) {
                self.setOpenIcon();
                /*
                self.$el.find('i').velocity({ rotateZ : '45deg' }, { duration : 250, complete : function() {
                    cl('animation complete');
                }});
                */
                self.$el.append(el);
                //self.$el.find('ul').velocity('transition.swoopIn');
                //self.$el.find('ul').velocity('transition.swoopIn', { duration : 200 });
                //self.$el.find('ul').velocity('transition.flipYIn', { duration : 200 });
                //self.$el.find('ul').velocity('transition.shrinkIn', { duration : 200 });
                //self.$el.find('ul').velocity('transition.bounceLeftIn', { duration : 200 });
                //self.$el.find('ul').velocity('transition.slideDownIn', { duration : 200 });
                self.$el.find('ul').velocity('transition.perspectiveLeftIn', { duration : 300 });
                cl(
                self.$el.find('ul')
                )
            });
        }
    });

    var TreeChildrenView = Backbone.View.extend({
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

    return TreeChildrenView;
});
