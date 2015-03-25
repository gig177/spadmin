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
            'click i': 'toggleChildren'
        },
        initialize: function() {
        },
        render: function() {
            this.$el.html( swig.run(treeNodeTpl, this.model.attributes) );
            return this;
        },
        _setLoadingIcon: function() {
            this.$el.children('i').attr('class', 'glyphicon glyphicon-refresh fa-spin');
        },
        _setCloseIcon: function() {
            this.$el.children('i').attr('class', 'glyphicon glyphicon-circle-arrow-right');
        },
        _setOpenIcon: function() {
            this.$el.children('i').attr('class', 'glyphicon glyphicon-circle-arrow-down');
        },
        toggleChildren: function(e) {
            e.stopPropagation();
            var m = this.model;
            if (m.get('opened')) {
                m.set('opened', false);
                this._closeChildren();
            } else {
                m.set('opened', true);
                this._openChildren();
            }
        },
        _openChildren: function() {
            cl('openChildren');
            this._setOpenIcon();

            var m = this.model, self = this;
            if (!this._childrenView) {
                this._childrenView = new TreeChildrenView( m.get('eid') );
                this._childrenView.render().done(function(el) {
                    self.$el.append(el);
                    self._childrenView.open();
                });
                m.set('children', this._childrenView.collection);
            } else {
                this._childrenView.open();
            }
        },
        _closeChildren: function() {
            cl('closeChildren');
            this._setCloseIcon();

            this._childrenView.close();
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
        },
        open: function() {
            //this.$el.find('ul').velocity('transition.swoopIn');
            //this.$el.find('ul').velocity('transition.swoopIn', { duration : 200 });
            //this.$el.find('ul').velocity('transition.flipYIn', { duration : 200 });
            //this.$el.find('ul').velocity('transition.shrinkIn', { duration : 200 });
            //this.$el.find('ul').velocity('transition.bounceLeftIn', { duration : 200 });
            //this.$el.find('ul').velocity('transition.slideDownIn', { duration : 200 });
            this.$el.velocity('transition.perspectiveLeftIn', { duration : 300 });
        },
        close: function() {
            this.$el.velocity('transition.perspectiveLeftOut', { duration : 300 });
        }
    });

    return TreeChildrenView;
});
