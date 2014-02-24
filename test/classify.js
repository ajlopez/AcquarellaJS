
var classiffier = require('../lib/classifier.js');

exports['empty string'] = function (test) {
    var result = classiffier.classify('');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
};

