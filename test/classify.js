
var classifier = require('../lib/classifier.js');

var Char = classifier.Char;

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
    test.equal(result[0], Char.Letter);
};

exports['reserverd word'] = function (test) {
    var result = classifier.classify('for', { reserved: ['if', 'for', 'while'] });

    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 3);
    test.ok(all(result, Char.Reserved));
};

exports['reserverd words'] = function (test) {
    var result = classifier.classify('for k if', { reserved: ['if', 'for', 'while'] });

    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 8);
    test.ok(all(result.slice(0,3), Char.Reserved));
    test.equal(result[3], Char.Space);
    test.equal(result[4], Char.Letter);
    test.equal(result[5], Char.Space);
    test.ok(all(result.slice(6,8), Char.Reserved));
};

exports['digit'] = function (test) {
    var result = classifier.classify('0');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.equal(result[0], Char.Digit);
};

exports['whitespaces'] = function (test) {
    var result = classifier.classify(' \r\n\t');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 4);
    test.ok(all(result, Char.Space));
};

exports['other'] = function (test) {
    var result = classifier.classify('@!#$');
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 4);
    test.ok(all(result, Char.Other));
};

exports['delimiters'] = function (test) {
    var result = classifier.classify(';,{}.', { delimiters: ";,{}." });
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 5);
    test.ok(all(result, Char.Delimiter));
};

exports['operators'] = function (test) {
    var result = classifier.classify('=!&|', { operators: "=!&|" });
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 4);
    test.ok(all(result, Char.Operator));
};

exports['double quoted string'] = function (test) {
    var result = classifier.classify('"foo"', { strings: { delimiter: '"' } });
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 5);
    test.ok(all(result, Char.String));
};

exports['double quoted string with escape character'] = function (test) {
    var result = classifier.classify('"foo\\\"bar"', { strings: { delimiter: '"', escape: '\\' } });
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 10);
    test.ok(all(result, Char.String));
};

exports['line comment'] = function (test) {
    var result = classifier.classify('foo// line comment\nbar', { comments: { line: '//' } });
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 22);
    test.ok(all(result, Char.Comment));
};
