define(['lib/amd-loader'], function(amdLoader) {
    var pluginBuilder = './tpl-build';
    return amdLoader('tpl', 'html.js', function(name, source, req, callback, errback, config) {
        callback(source);
/*
        require(['nunjucks'], function(nunjucks) {
            //var env = new nunjucks.Environment(new MyLoader('/view/templates'));
            //var res = nunjucks.compile(source, env, 'hello')

            callback(res);
        });
        */
    });
});