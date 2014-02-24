
var Char = { Space: 0, Letter: 1, Digit: 2 };

function classify(text) {
    var result = [];
    var l = text.length;
    
    for (var k = 0; k < l; k++) {
        var ch = text[k];
        if (isWhitespace(ch))
            result[k] = Char.Space;
        else if (isDigit(ch))
            result[k] = Char.Digit;
        else
            result[k] = Char.Letter;
    }
    
    return result;
}

function isWhitespace(ch) {
    return ch.charCodeAt(0) <= 32;
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

module.exports = {
    classify: classify,
    Letter: Char.Letter,
    Digit: Char.Digit,
    Space: Char.Space
};