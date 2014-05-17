
var classifier = require('../lib/classifier.js');

var Letter = classifier.Letter;
var Digit = classifier.Digit;
var Space = classifier.Space;
var Other = classifier.Other;
var Delimiter = classifier.Delimiter;
var Operator = classifier.Operator;

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

exports['other'] = function (test) {
    var result = classifier.classify('@!#$');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 4);
    test.ok(all(result, Other));
};

exports['delimiters'] = function (test) {
    var result = classifier.classify(';,{}.', { delimiters: ";,{}." });
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 5);
    test.ok(all(result, Delimiter));
};

exports['operators'] = function (test) {
    var result = classifier.classify('=!&|', { operators: "=!&|" });
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 4);
    test.ok(all(result, Operator));
};

