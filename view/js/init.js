define(function(require) {
    require('helpers/debug');

    var $ = require('lib/jquery');
    var app = require('app');

    $(function() {
        try {
            new app();
        } catch (e) {
            cl(e);
            cl(e.stack);
        }
    });
});
