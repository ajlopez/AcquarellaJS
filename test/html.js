
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
