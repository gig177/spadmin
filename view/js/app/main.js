define(function(require) {
    require('app/routes');

    var Backbone = require('lib/backbone'),
        Map = require('lib/crossroads');

    return function() {
        Backbone.history.handlers.push({
            route: /(.*)/,
            callback: function (fragment) {
                cl('Map.parse running...');
                Map.parse(fragment);
            }
        });
        Backbone.history.start({ pushState: true }); 
        $(document).on('click', 'a', function(evt) {
            var href = $(this).attr('href');
            Backbone.history.navigate(href, true);
            return false;
        });
        //cl('run app');
        //new LibraryView();
        /*
        new AppRouter();
        new AppView();
        Backbone.history.start();
        */
    }
});
