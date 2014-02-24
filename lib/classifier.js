
var Char = { Letter: 1, Digit: 2 };

function classify(text) {
    var result = [];
    var l = text.length;
    
    for (var k = 0; k < l; k++) {
        var ch = text[k];
        if (isDigit(ch))
            result[k] = Char.Digit;
        else
            result[k] = Char.Letter;
    }
    
    return result;
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

module.exports = {
    classify: classify,
    Letter: Char.Letter,
    Digit: Char.Digit
};