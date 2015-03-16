define(function(require) {
    require('css!view/ccss/init');

    var Backbone = require('lib/backbone');

    var Router = require('app/router'),
        urlMap = require('app/url-map');

    var MenuView = require('app/views/menu');

    var router = new Router(urlMap);
    return function() {
        Backbone.history.handlers.push({
            route: /(.*)/,
            callback: function(req) {
                cl('Map.parse running...');
                try {
                    router.dispatch(req);
                } catch (e) {
                    cl(e);
                    cl(e.stack);
                }
            }
        });
        Backbone.history.start({ pushState: true }); 
        $(document).on('click', 'a', function(evt) {
            var href = $(this).attr('href');
            Backbone.history.navigate(href, true);
            return false;
        });

        new MenuView();
        //cl(window.categoryCollection);
        m = window.categoryCollection[0].models[0];
    }
});
