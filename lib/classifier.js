
var Char = { Space: 0, Letter: 1, Digit: 2, Other: 3, Punctuation: 4 };

function classify(text, options) {
    options = options || { };
    
    var result = [];
    var l = text.length;
    
    for (var k = 0; k < l; k++) {
        var ch = text[k];
        if (isWhitespace(ch))
            result[k] = Char.Space;
        else if (isDigit(ch))
            result[k] = Char.Digit;
        else if (isLetter(ch))
            result[k] = Char.Letter;
        else if (options.punctuations && options.punctuations.indexOf(ch) >= 0)
            result[k] = Char.Punctuation;
        else
            result[k] = Char.Other;
    }
    
    return result;
}

function isWhitespace(ch) {
    return ch.charCodeAt(0) <= 32;
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

function isLetter(ch) {
    return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
}

module.exports = {
    classify: classify,
    Letter: Char.Letter,
    Digit: Char.Digit,
    Space: Char.Space,
    Other: Char.Other,
    Punctuation: Char.Punctuation
};