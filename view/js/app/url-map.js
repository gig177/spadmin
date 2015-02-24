define(function(require) {
    var rule = require('app/rule');
    var map = [
        rule('/',                 'catalog.index'),
        rule('/{module}/',        'catalog.tree'),
        rule('/{module}/{eid}/',  'catalog.item'),
    ];

    return map;
});
