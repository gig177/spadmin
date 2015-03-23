define(function(require) {
    var crossroads = require('lib/crossroads'),
        Backbone = require('lib/backbone');

    var page = require('app/page');

    function Router(urlMap) {
        urlMap.forEach(function(rule) {
            var cb = null;
            if (rule.opts.redirect) {
                cb = function() {
                    Backbone.history.navigate(rule.opts.redirect, true);
                };
            } else {
                cb = function() {
                    cl('routed to:', rule);
                    page.trigger('module', rule.module);
                    require(['app/modules/' + rule.module + '.' + rule.endpoint]);
                };
            }
            crossroads.addRoute(rule.ptn, cb);
        });
    }
    Router.prototype.dispatch = function(req) {
        crossroads.parse(req);
        crossroads.bypassed.add(function(req) {
            throw new Error('request "' + req + '" not matched!');
        });
    }

    return Router;
});
