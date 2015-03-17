define(function(require) {
    var Backbone = require('lib/backbone'),
        _ = require('lib/underscore');
    
    var page = {};
    _.extend(page, Backbone.Events);

    return page;
});
