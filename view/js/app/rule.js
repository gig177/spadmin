define(function(require) {
    function rule(ptn, endpoint) {
        endpoint = endpoint.split('.');
        return {
            ptn: ptn,
            module: endpoint[0],
            endpoint: endpoint[1]
        };
    }

    return rule;
});
