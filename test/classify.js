
var classifier = require('../lib/classifier.js');

var Letter = classifier.Letter;
var Digit = classifier.Digit;
var Space = classifier.Space;

function all(items, value) {
    var l = items.length;
    
    for (var k = 0; k < l; k++)
        if (items[k] !== value)
            return false;
            
    return true;
}

exports['empty string'] = function (test) {
    var result = classifier.classify('');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
};

exports['letter'] = function (test) {
    var result = classifier.classify('a');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.equal(result[0], Letter);
};

exports['digit'] = function (test) {
    var result = classifier.classify('0');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.equal(result[0], Digit);
};

exports['whitespaces'] = function (test) {
    var result = classifier.classify(' \r\n\t');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 4);
    test.ok(all(result, Space));
};

