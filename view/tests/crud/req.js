var cl = console.log;
var req = require('supertest')('http://localhost:5000');

module.exports = function(method, url, status, item, validators) {
    validators = validators instanceof Object? [validators]: [];
    var r = req[method](url)
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(status);
    if (validators.length) {
        r.expect(function(res) {
            validators.forEach(function(Validator) {
                var validator = new Validator();
                var prop = null;
                for (prop in validator) {
                    if (validator[prop] instanceof Function) {
                        /*
                        cl('\tprop:', prop);
                        cl('validator[prop]:', validator[prop]);
                        */
                        validator[prop]( res.body[prop] );
                        //cl('---------------------');
                    }
                }
            });
        });
    }
    if (item instanceof Object)
        r.send(item);
    return r;
}