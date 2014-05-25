
var acq = require('..');

exports['get name as html'] = function (test) {
    var result = acq.toHtml('foo');
    
    test.equal(result, "<span class='acqname'>foo</span>");
}

exports['get two names as html'] = function (test) {
    var result = acq.toHtml('foo bar');
    
    test.equal(result, "<span class='acqname'>foo</span> <span class='acqname'>bar</span>");
}