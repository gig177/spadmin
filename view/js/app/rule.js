define(function(require) {
    function rule(ptn, endpoint, opts) {
        if (endpoint instanceof Object) {
            opts = endpoint;
            endpoint = [null, null];
        } else {
            endpoint = endpoint.split('.');
            opts = opts || {};
        }
        return {
            ptn: ptn,
            module: endpoint[0],
            endpoint: endpoint[1],
            opts: opts
        };
    }

    return rule;
});
