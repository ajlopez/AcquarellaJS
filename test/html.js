
var acq = require('..');

exports['get name as html'] = function (test) {
    var result = acq.toHtml('foo');
    
    test.equal(result, "<span class='acqname'>foo</span>");
}

exports['get name with spaces as html'] = function (test) {
    var result = acq.toHtml('  foo ');
    
    test.equal(result, "  <span class='acqname'>foo</span> ");
}

exports['get name with digits as html'] = function (test) {
    var result = acq.toHtml('foo42');
    
    test.equal(result, "<span class='acqname'>foo42</span>");
}

exports['get name with underscore as html'] = function (test) {
    var result = acq.toHtml('foo_42');
    
    test.equal(result, "<span class='acqname'>foo_42</span>");
}

exports['get two names as html'] = function (test) {
    var result = acq.toHtml('foo bar');
    
    test.equal(result, "<span class='acqname'>foo</span> <span class='acqname'>bar</span>");
}

exports['get number as html'] = function (test) {
    var result = acq.toHtml('42');
    
    test.equal(result, "<span class='acqnumber'>42</span>");
}

exports['get two numbers as html'] = function (test) {
    var result = acq.toHtml('4 2');
    
    test.equal(result, "<span class='acqnumber'>4</span> <span class='acqnumber'>2</span>");
}

exports['get delimiters as html'] = function (test) {
    var result = acq.toHtml(';,{}.', { delimiters: ";,{}." });
    
    test.equal(result, "<span class='acqdelimiter'>;,{}.</span>");
}

exports['get operators as html'] = function (test) {
    var result = acq.toHtml('=!&|', { operators: "=!&|" });
    
    test.equal(result, "<span class='acqoperator'>=!&|</span>");
}

exports['get double quoted string'] = function (test) {
    var result = acq.toHtml('"foo"', { strings: { delimiter: '"' } });
    
    test.equal(result, "<span class='acqstring'>\"foo\"</span>");
}

exports['get double quoted string with escape character'] = function (test) {
    var result = acq.toHtml('"foo\\\"bar"', { strings: { delimiter: '"', escape: '\\' } });
    
    test.equal(result, "<span class='acqstring'>\"foo\\\"bar\"</span>");
}

exports['recognize reserved words'] = function (test) {
    var result = acq.toHtml('if k', { reserved: [ 'if', 'for', 'while' ] });
    
    test.equal(result, "<span class='acqreserved'>if</span> <span class='acqname'>k</span>");
}

