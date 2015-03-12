define(['lib/amd-loader'], function(amdLoader) {
    return amdLoader('tpl', 'html.js', function(name, source, req, callback, errback, config) {
        /*
        var
            precompileString = requirejs.nodeRequire('nunjucks').precompileString,
            path = requirejs.nodeRequire('path');

        var cl = console.log;

        var precompiledTpl = precompileString(source, {
            name: path.basename(name)
        });
        */

/*
        var output = 'define(function() {\n'
            + 'var t = ' + source + '; \n'
            //+ 'var t = ' + precompiledTpl + '; \n'
            + '});'
        callback(output);
        */
        callback(source);
    });
});