define(function(require) {
    var Backbone = require('lib/backbone');

    var MenuItem = Backbone.Model.extend({
        defaults: {
            href : undefined,
            name : undefined
        },
        parse: function(resp) {
            resp.title += ' (rewrited title from parse method of book model)';
            return resp;
        }
    });
    return MenuItem;
});
