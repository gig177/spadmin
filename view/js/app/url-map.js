define(function(require) {
    var rule = require('app/rule');
    var map = [
        rule('/',                 'catalog.index'),
        rule('/catalog/',        'catalog.tree'),
        rule('/catalog/{eid}/',  'catalog.item'),
        rule('/experts/',        'experts.index'),
        rule('/other/',        'other.index'),
    ];

    return map;
});
