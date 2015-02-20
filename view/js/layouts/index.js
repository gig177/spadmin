define(function(require) {
    require('init');
    var Backbone = require('lib/backbone'),
        $ = require('lib/jquery'),
        Map = require('lib/crossroads');

/*
    cr.addRoute('catalog/', function() {
        console.log('in catalog');
    });
    */

    Map.addRoute('{module}/{eid}/', function(module, eid) {
          console.log('module:', module, eid);
    });
    Map.addRoute('{module}/{eid}/', function(module, eid) {
          console.log('module:', module, eid);
    });
    //will match `sectionRoute` passing "news" and `123` as param
    Map.parse('catalog/233/');
    return;


    var Router = Backbone.Router.extend({
        route: /(.*)/,
        callback: function() {
            cl('main route');
        },
        execute: function(callback, args) {
            cl('in execute');
            /*
            args.push(parseQueryString(args.pop()));
            if (callback) callback.apply(this, args);
            */
        }
    });
    $(function() {
        Backbone.history.handlers.push({
            route: /(.*)/,
            callback: function (fragment) {
                cr.parse(fragment);
            }
        });
        Backbone.history.start({ pushState: true }); 
    });

    $(document).on('click', 'a', function(evt) {
        var href = $(this).attr('href');
        Backbone.history.navigate(href, true);
        return false;
    });

/*
    var $ = require('lib/jquery'),
        app = require('app');

    $(function() {
        try {
            new app();
        } catch (e) {
            cl(e);
            cl(e.stack);
        }
    });
*/
});
