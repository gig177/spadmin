define(function(require) {
    var Map = require('lib/crossroads');
    Map.addRoute('/admin/', function() {
          console.log('module index');
    });
    Map.addRoute('{module}/', function(module) {
          console.log('module:', module);
    });
    Map.addRoute('{module}/{eid}/', function(module, eid) {
          console.log(module, 'item:', eid);
    });



    Map.bypassed.add(function(request){
        console.log('request not matched:', request);
    });
});
