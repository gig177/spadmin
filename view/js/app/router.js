define(function(require) {
    var crossroads = require('lib/crossroads');

    function Router(urlMap) {
        urlMap.forEach(function(rule) {
            crossroads.addRoute(rule.ptn, function() {
                cl(rule)
                /*
                require(['app/modules/' + rule.module], function(module) {
                    cl(module, module[rule.endpoint], rule.endpoint);
                });
                */
            });
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
